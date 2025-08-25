<?php

namespace App\Repositories\Orders\Repository;

use App\Jobs\CourierInvoiceDestroyOnAWS;
use App\Jobs\CourierInvoiceStoreOnAWS;
use App\Jobs\PayemntProofStoreOnAWS;
use App\Jobs\PaymentProofDestroyOnAWS;
use App\Models\Collaborator;
use App\Models\Customer;
use App\Models\Order;
use App\Models\RewardSetting;
use App\Models\Smartphone;
use App\Repositories\Orders\Interface\IOrderRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Validator;

class OrderRepository implements IOrderRepository
{
    public function __construct(
        private Order $order,
        private Collaborator $collaborator,
        private Smartphone $smartphone,
        private Customer $customer,
        private RewardSetting $reward_setting
    ) {}

    public function getAllOrders(Request $request)
    {
        $orders = $this->order
            ->with(['collaborator', 'customer', 'customer.user'])
            ->when(! empty($request->input('search')), function ($query) use ($request) {
                $query->WhereHas('customer.user', function ($subQ) use ($request) {
                    $subQ->where('name', 'like', '%'.$request->input('search').'%')
                        ->orWhere('email', 'like', '%'.$request->input('search').'%')
                        ->orWhere('phone', 'like', '%'.$request->input('search').'%');
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return $orders;
    }

    public function getSingleOrder(string $id)
    {
        $order = $this->order->with(
            [
                'collaborator',
                'customer',
                'customer.user',
                'orderPackageRecordings',
                'orderItems',
                'orderItems.smartphone',
                'orderItems.smartphone.model_name',
                'orderItems.smartphone.capacity',
                'orderItems.smartphone.selling_info',
                'orderItems.smartphone.category',
                'orderItems.smartphone.category.distributor',
                'orderItems.smartphone.category.distributor.user',
            ]
        )->find($id);

        return $order;
    }

    public function storeOrder(Request $request)
    {
        $validated_req = $request->validate([
            'customer_id' => ['required', 'exists:customers,id'],
            'smartphones' => ['required', 'array'],
            'referral_code' => ['nullable', 'exists:collaborators,referral_code'],
        ], [
            'customer_id.required' => 'The Customer Field Is Required.',
            'customer_id.exists' => 'The selected customer is invalid.',
            'referral_code.exists' => 'The Entered referral code is invalid.',
            'smartphones.required' => 'The Please Select Atleast One Smartphone For Creating Order.',
        ]);

        try {

            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'smartphones.*.id' => ['required', 'exists:smartphones,id'],
                'smartphones.*.quantity' => ['required', 'integer', 'min:1'],
            ], [
                'smartphones.*.id.required' => 'The Smartphone Field Is Required.',
                'smartphones.*.id.exists' => 'The selected smartphone is invalid.',
                'smartphones.*.quantity.required' => 'The Quantity Field Is Required.',
                'smartphones.*.quantity.integer' => 'The Quantity Field Must Be Integer.',
                'smartphones.*.quantity.min' => 'The Quantity Field Must Be Atleast 1.',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->errors()->first());
            }

            $customer = $this->customer->find($validated_req['customer_id']);
            if (empty($customer)) {
                throw new Exception('Invalid Customer');
            }

            if (
                empty($customer->country) ||
                empty($customer->state) ||
                empty($customer->city) ||
                empty($customer->postal_code) ||
               (
                   empty($customer->address_line1) &&
                   empty($customer->address_line2)
               )
            ) {
                throw new Exception('Please Complete Customer Profile, Before Placing An Order ');
            }

            if (! empty($validated_req['referral_code'])) {

                if ($this->reward_setting->doesntExist()) {
                    throw new Exception('Reward Point Setting Not Setup Please Setup Reward Point Setting To Use Reward Points Feature');
                }

                $collaborator = $this->collaborator->where('referral_code', $validated_req['referral_code'])->first();
                if (empty($collaborator)) {
                    throw new Exception('Invalid Referral Code');
                }
                $validated_req['collaborator_id'] = $collaborator->id;
            }

            $ids = collect($validated_req['smartphones'])->pluck('id');

            $duplicates = $ids->duplicates();

            if ($duplicates->isNotEmpty()) {
                throw new Exception('Duplicate Smartphones Are Not Allowed');
            }

            $smartphones = $this->smartphone->with(['selling_info', 'inventory_items', 'model_name', 'category.distributor'])
                ->whereIn('id', $ids)
                ->get();

            if ($smartphones->isEmpty()) {
                throw new Exception('Selected Smartphones Are Invalid');
            }

            $smartphoneQuantities = collect($validated_req['smartphones'])
                ->mapWithKeys(fn ($item) => [$item['id'] => $item['quantity']]);

            $order_items = [];
            $amount = 0;

            $distributor_ids = $smartphones->pluck('category.distributor.id')->toArray();

            if (in_array(null, $distributor_ids, true)) {
                throw new Exception('One or more smartphones are missing a category. Please assign a category before placing an order.');
            }

            if (count(array_unique($distributor_ids)) !== 1) {
                throw new Exception('Order cannot be placed because the selected smartphones belong to different distributors. Please select products from the same distributor.');
            }

            foreach ($smartphones as $smartphone) {

                if ($smartphone->inventory_items->isEmpty()) {
                    throw new Exception(" {$smartphone->model_name->name} Smartphone Is Out Of Stock Please Check");
                }

                if ($smartphone->inventory_items()->where('status', 'in_stock')->doesntExist()) {
                    throw new Exception("{$smartphone->model_name->name} Smartphone Is Out Of Stock Please Check");
                }

                if ($smartphone->inventory_items()->where('status', 'in_stock')->count() < $smartphoneQuantities[$smartphone->id]) {
                    throw new Exception("{$smartphone->model_name->name} Smartphone Has Less Stock But You Have Selected More Quantity Please Check");
                }

                if (empty($smartphone->selling_info)) {
                    throw new Exception("{$smartphone->model_name->name} Smartphone Dont have Selling Price Please Check");
                }

                /** Distributor Commission logic Remeaning
                 *
                 */

                /** Collaborator Commission logic Remeaning
                 *
                 */
                $quantity = $smartphoneQuantities[$smartphone->id];
                $unit_price = $smartphone->selling_info->total_price;
                $sub_total = $smartphone->selling_info->total_price * $quantity;
                $amount += $sub_total;

                $validated_req['amount'] = $amount;

                $order_items[] = [
                    'smartphone_id' => $smartphone->id,
                    'unit_price' => $unit_price,
                    'quantity' => $quantity,
                    'sub_total' => $sub_total,
                ];

                $inventoryItems = $smartphone->inventory_items()
                    ->where('status', 'in_stock')
                    ->lockForUpdate()
                    ->limit($quantity)
                    ->get();

                foreach ($inventoryItems as $inventoryItem) {
                    $inventoryItem->status = 'on_hold';
                    $inventoryItem->save();
                }

            }

            unset($validated_req['referral_code'], $validated_req['smartphones']);
            $created = $this->order->create($validated_req);

            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating Order');
            }

            foreach ($order_items as $item) {
                $item['order_id'] = $created->id;
            }

            $created->orderItems()->createMany($order_items);

            DB::commit();

            return [
                'status' => true,
                'message' => 'Order Created Successfully',
            ];

        } catch (Exception $e) {
            DB::rollBack();

            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateOrder(Request $request, string $id)
    {
        $order = $this->getSingleOrder($id);

        if (empty($order)) {
            return [
                'status' => false,
                'message' => 'Order Not Found',
            ];
        }

        $validated_req = [];
        if ($order->status === 'pending') {
            $validated_req = $request->validate([
                'status' => ['required', Rule::in(['pending', 'paid'])],
                ...(empty($order->payment_proof) ? ['payment_proof' => ['required', 'image', 'max:5048']] : []),
            ], [
                'payment_proof.max' => 'Payment Proof Image Size Must be less than 5MB',
            ]);
            unset($validated_req['payment_proof']);
        }

        if ($order->status === 'paid') {
            $validated_req = $request->validate([
                'status' => ['required', Rule::in(['paid', 'shipped'])],
                'courier_company' => ['required', 'string', 'max:255'],
                'tracking_no' => ['required', 'string', 'max:255'],
                'shipping_date' => ['required', 'date'],
                'is_cash_collected' => ['required', 'boolean'],
                ...(empty($order->courier_invoice) ? ['courier_invoice' => ['required', 'mimes:pdf', 'max:5048']] : []),
            ], [
                'courier_invoice.max' => 'Courier Invoice PDF Size Must be less than 5MB',
                'is_cash_collected.required' => 'Cash Collected Field Is Required',
                'is_cash_collected.boolean' => 'Cash Collected Field Should Be Yes Or No',
            ]);

            unset($validated_req['courier_invoice']);
        }

        if ($order->status === 'shipped') {
            $validated_req = $request->validate([
                'status' => ['required', Rule::in(['shipped', 'arrived_locally'])],
                'is_cash_collected' => ['required', 'boolean'],
            ], [
                'is_cash_collected.required' => 'Cash Collected Field Is Required',
                'is_cash_collected.boolean' => 'Cash Collected Field Should Be Yes Or No',
            ]);
        }

        if ($order->status === 'arrived_locally') {
            $validated_req = $request->validate([
                'status' => ['required', Rule::in(['arrived_locally', 'delivered'])],
                'is_cash_collected' => ['required', 'boolean'],
            ], [
                'is_cash_collected.required' => 'Cash Collected Field Is Required',
                'is_cash_collected.boolean' => 'Cash Collected Field Should Be Yes Or No',
            ]);
        }

        try {
            DB::beginTransaction();

            if ($order->status === 'pending') {
                $smartphone_ids = $order->orderItems()->pluck('smartphone_id')->toArray();

                $smartphones = $this->smartphone->with(['inventory_items'])->whereIn('id', $smartphone_ids)->get();

                foreach ($smartphones as $smartphone) {

                    $quantity = $order->orderItems()->where('smartphone_id', $smartphone->id)->pluck('quantity')->implode(' ');
                    $inventoryItems = $smartphone->inventory_items()
                        ->where('status', 'on_hold')
                        ->lockForUpdate()
                        ->limit($quantity)
                        ->get();

                    foreach ($inventoryItems as $inventoryItem) {
                        $inventoryItem->status = 'sold';
                        $inventoryItem->save();
                    }
                }
            }

            if (isset($validated_req['status']) && $validated_req['status'] === 'pending' && $order->status === 'pending') {
                throw new Exception('The Status Should Be Changed To Paid Before Proceesing');
            }

            if (isset($validated_req['status']) && $validated_req['status'] === 'paid' && $order->status === 'paid') {
                throw new Exception('The Status Should Be Changed To Shipped Before Proceesing');
            }

            if (isset($validated_req['status']) && $validated_req['status'] === 'shipped' && $order->status === 'shipped') {
                throw new Exception('The Status Should Be Changed To Arrived Locally Before Proceesing');
            }

            if (isset($validated_req['status']) && $validated_req['status'] === 'arrived_locally' && $order->status === 'arrived_locally') {
                throw new Exception('The Status Should Be Changed To Delivered Before Proceesing');
            }

            $oldStatus = $order->status;
            $updated = $order->update($validated_req);

            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Order');
            }

            DB::commit();

            if ($request->hasFile('payment_proof') && empty($order->payment_proof) && $oldStatus === 'pending') {
                $file = $request->file('payment_proof');
                $new_name = time().uniqid().'.'.$file->getClientOriginalExtension();
                $temp_path = $file->storeAs('temp/uploads', $new_name, 'local');

                dispatch(new PayemntProofStoreOnAWS($temp_path, $order));
            }

            if ($request->hasFile('courier_invoice') && empty($order->courier_invoice) && $oldStatus === 'paid') {
                $file = $request->file('courier_invoice');
                $new_name = time().uniqid().'.'.$file->getClientOriginalExtension();
                $temp_path = $file->storeAs('temp/uploads', $new_name, 'local');

                dispatch(new CourierInvoiceStoreOnAWS($temp_path, $order));
            }

            return [
                'status' => true,
                'message' => 'Order Updated Successfully',
            ];
        } catch (Exception $e) {

            DB::rollBack();

            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyOrder(string $id)
    {
        try {
            DB::beginTransaction();
            $order = $this->getSingleOrder($id);

            if (empty($order)) {
                throw new Exception('Order Not Found');
            }

            if ($order->status === 'pending') {
                $smartphone_ids = $order->orderItems()->pluck('smartphone_id')->toArray();

                $smartphones = $this->smartphone->with(['inventory_items'])->whereIn('id', $smartphone_ids)->get();

                foreach ($smartphones as $smartphone) {
                    $smartphone->inventory_items()->where('status', 'on_hold')->update(['status' => 'in_stock']);
                }
            }

            if (! empty($order->payment_proof)) {
                dispatch(new PaymentProofDestroyOnAWS($order->payment_proof));
            }

            if (! empty($order->courier_invoice)) {
                dispatch(new CourierInvoiceDestroyOnAWS($order->courier_invoice));
            }

            $deleted = $order->delete();

            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Order');
            }

            DB::commit();

            return [
                'status' => true,
                'message' => 'Order Deleted Successfully',
            ];
        } catch (Exception $e) {
            DB::rollBack();

            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyOrderBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');

            if (blank($ids)) {
                throw new Exception('Something Went Wrong While Deleting Order');
            }

            foreach ($ids as $id) {
                $response = $this->destroyOrder($id);
                if ($response['status'] === false) {
                    throw new Exception($response['message']);
                }
            }

            return [
                'status' => true,
                'message' => 'Selected Orders Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateCashCollectedStatus(string $id)
    {
        try {
            $order = $this->order->find($id);

            if (empty($order)) {
                throw new Exception('Order Not Found');
            }

            if ($order->status === 'pending') {
                throw new Exception('This Status Cannot Be Changed Until The Order Status Is Changed To Paid');
            }

            $updated = $order->update([
                'is_cash_collected' => ! $order->is_cash_collected,
            ]);

            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Order Cash Collected Status');
            }

            return [
                'status' => true,
                'message' => 'Order Cash Collected Status Updated Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getSmartphones()
    {
        return $this->smartphone
            ->with(['model_name', 'selling_info', 'capacity'])
            ->latest()
            ->get()
            ->map(function ($smartphone) {

                $smartphone->name = $smartphone->model_name->name;

                return $smartphone;
            });
    }

    public function getCustomers()
    {
        return $this->customer
            ->with('user')
            ->whereHas('user', function ($query) {
                $query->where('is_active', true);
            })
            ->latest()
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->user->name,
                ];
            });
    }

    public function customerOrderInvoiceByOrderNo(Request $request, string $order_no)
    {

        try {
            $order = $this->order
                ->with(
                    [
                        'collaborator',
                        'customer',
                        'customer.user',
                        'orderItems',
                        'orderItems.smartphone',
                        'orderItems.smartphone.model_name',
                        'orderItems.smartphone.capacity',
                        'orderItems.smartphone.selling_info',
                        'orderItems.smartphone.category',
                    ]
                )
                ->where('order_no', $order_no)
                ->first();

            if (empty($order)) {

                throw new Exception('Invoice Not Found');
            }

            if ($order->status == 'pending') {
                throw new Exception('Cannot View Invoice Before Payment');
            }

            if ($request->user()->id !== $order->customer->user_id) {

                if (! $request->user()->hasRole('Admin')) {
                    throw new Exception('Invoice Not Found');
                }
            }

            return [
                'status' => true,
                'message' => 'Invoice Found',
                'order' => $order,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function ShippingOrderInvoice(Request $request, string $order_no)
    {
        try {
            $order = $this->order
                ->with(
                    [
                        'collaborator',
                        'customer',
                        'customer.user',
                        'orderItems',
                        'orderItems.smartphone',
                        'orderItems.smartphone.model_name',
                        'orderItems.smartphone.capacity',
                        'orderItems.smartphone.selling_info',
                        'orderItems.smartphone.category',
                    ]
                )
                ->where('order_no', $order_no)
                ->first();

            if (empty($order)) {
                throw new Exception('Invoice Not Found');
            }

            if (! $request->user()->hasRole('Admin')) {
                throw new Exception('You Are Not Allowed To View This Invoice');
            }

            return [
                'status' => true,
                'message' => 'Invoice Found',
                'order' => $order,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
