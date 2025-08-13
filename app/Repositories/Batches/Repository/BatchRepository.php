<?php

namespace App\Repositories\Batches\Repository;

use App\Models\Batch;
use App\Models\Inventory;
use App\Models\Supplier;
use App\Repositories\Batches\Interface\IBatchRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class BatchRepository implements IBatchRepository
{
    public function __construct(
        private Batch $batch,
        private Supplier $supplier,
        private Inventory $inventory
    ) {}

    public function getAllBatches(Request $request)
    {
        $batches = $this->batch
            ->with(['supplier', 'supplier.user'])
            ->when(! empty($request->input('search')), function ($query) use ($request) {
                $query->where(function ($subQ) use ($request) {
                    $subQ->where('batch_name', 'like', '%'.$request->input('search').'%')
                        ->orWhereHas('supplier.user', fn ($query) => $query->where('name', 'like', '%'.$request->input('search').'%'));
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return $batches;
    }

    public function getSingleBatch(string $id)
    {
        $batch = $this->batch
            ->with(['supplier', 'supplier.user', 'inventory_items', 'inventory_items.smartphone', 'inventory_items.storage_location', 'inventory_items.smartphone.model_name'])
            ->find($id);

        return $batch;
    }

    public function getSingleFormatedBatchForEdit(string $id)
    {
        $batch = $this->batch
            ->with(['inventory_items'])
            ->find($id);

        return $batch;

    }

    public function storeBatch(Request $request)
    {
        $validated_req = $request->validate([
            'batch_name' => ['required', 'string', 'max:255'],
            'vat' => ['required', 'string', 'max:255'],
            'base_purchase_unit_price' => ['required', 'numeric', 'min:1'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'extra_costs' => ['nullable', 'array'],
            'inventory_items' => ['required', 'array'],
        ]);

        $validator = Validator::make($request->all(), [
            'extra_costs.*.cost_type' => ['required', 'string', 'max:255'],
            'extra_costs.*.amount' => ['required', 'numeric', 'min:1'],
            'inventory_items.*.smartphone_id' => ['required', 'exists:smartphones,id'],
            'inventory_items.*.storage_location_id' => ['required', 'exists:storage_locations,id'],
            'inventory_items.*.imei1' => ['required', 'string', 'max:255', 'unique:inventories,imei1'],
            'inventory_items.*.imei2' => ['nullable', 'string', 'max:255', 'unique:inventories,imei2'],
            'inventory_items.*.eid' => ['nullable', 'string', 'max:255', 'unique:inventories,eid'],
            'inventory_items.*.serial_no' => ['nullable', 'string', 'max:255', 'unique:inventories,serial_no'],

        ], [
            'extra_costs.*.cost_type.required' => 'Cost type is required',
            'extra_costs.*.cost_type.max' => 'Cost type Should Not Exceed 255 Characters',
            'extra_costs.*.cost_type.string' => 'Cost type Must Be A String',
            'extra_costs.*.amount.required' => 'Cost amount is required',
            'extra_costs.*.amount.numeric' => 'Cost amount Must Be Numeric',
            'extra_costs.*.amount.min' => 'Cost amount must be at least 1',

            'inventory_items.*.smartphone_id.required' => 'Smartphone ID is required',
            'inventory_items.*.smartphone_id.exists' => 'Smartphone ID does not exist',
            'inventory_items.*.storage_location_id.required' => 'Storage Location ID is required',
            'inventory_items.*.storage_location_id.exists' => 'Storage Location ID does not exist',
            'inventory_items.*.imei1.required' => 'IMEI 1 is required',
            'inventory_items.*.imei1.max' => 'IMEI 1 Should Not Exceed 255 Characters',
            'inventory_items.*.imei1.string' => 'IMEI 1 Must Be A String',
            'inventory_items.*.imei2.max' => 'IMEI 2 Should Not Exceed 255 Characters',
            'inventory_items.*.imei2.string' => 'IMEI 2 Must Be A String',
            'inventory_items.*.eid.max' => 'EID Should Not Exceed 255 Characters',
            'inventory_items.*.eid.string' => 'EID Must Be A String',
            'inventory_items.*.serial_no.max' => 'Serial Number Should Not Exceed 255 Characters',
            'inventory_items.*.serial_no.string' => 'Serial Number Must Be A String',

            'inventory_items.*.serial_no.unique' => 'Serial Number Already Exists',
            'inventory_items.*.imei1.unique' => 'IMEI 1 Already Exists',
            'inventory_items.*.imei2.unique' => 'IMEI 2 Already Exists',
            'inventory_items.*.eid.unique' => 'EID Already Exists',

        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        try {
            DB::beginTransaction();
            // checking Duplications

            // Checking For Imei 1
            $imei1s = array_column($validated_req['inventory_items'], 'imei1');
            $duplicate_imei1s = array_filter(array_count_values($imei1s), fn ($count) => $count > 1);

            if (! empty($duplicate_imei1s)) {
                throw new Exception('IMEI 1 cannot be duplicated');
            }

            // Checking For Imei 2
            $imei2s = array_filter(array_column($validated_req['inventory_items'], 'imei2'));
            $duplicate_imei2s = array_filter(array_count_values($imei2s), fn ($count) => $count > 1);

            if (! empty($duplicate_imei2s)) {
                throw new Exception('IMEI 2 cannot be duplicated');
            }

            // Checking For EID
            $eids = array_filter(array_column($validated_req['inventory_items'], 'eid'));
            $duplicate_eids = array_filter(array_count_values($eids), fn ($count) => $count > 1);

            if (! empty($duplicate_eids)) {
                throw new Exception('EID cannot be duplicated');
            }

            // Checking For Serial No
            $serial_nos = array_filter(array_column($validated_req['inventory_items'], 'serial_no'));
            $duplicate_serial_nos = array_filter(array_count_values($serial_nos), fn ($count) => $count > 1);

            if (! empty($duplicate_serial_nos)) {
                throw new Exception('Serial Number cannot be duplicated');
            }

            // Extracting Quantity
            $total_quantity = 0;
            foreach ($validated_req['inventory_items'] as $inventory_item) {
                $total_quantity += 1;
            }
            $validated_req['total_quantity'] = $total_quantity;

            $total_extra_cost = 0;
            if (! blank($validated_req['extra_costs'])) {
                foreach ($validated_req['extra_costs'] as $extra_cost) {
                    $total_extra_cost += $extra_cost['amount'];

                }
            }

            $total_batch_cost = $validated_req['total_quantity'] * $validated_req['base_purchase_unit_price'] + $total_extra_cost;
            $final_unit_price = $total_batch_cost / $validated_req['total_quantity'];

            $validated_req['total_batch_cost'] = $total_batch_cost;
            $validated_req['final_unit_price'] = $final_unit_price;

            $batch = $this->batch->create(array_filter($validated_req, function ($value, $key) {
                return ! in_array($key, ['inventory_items']);
            }, ARRAY_FILTER_USE_BOTH));
            if (empty($batch)) {
                throw new Exception('Something Went Wrong While Creating Batch');
            }

            foreach ($validated_req['inventory_items'] as $inventory_item) {
                $created = $this->inventory->create(array_merge($inventory_item, ['batch_id' => $batch->id]));

                if (empty($created)) {
                    throw new Exception('Something Went Wrong While Creating Inventory');
                }
            }

            DB::commit();

            return [
                'status' => true,
                'message' => 'Batch Created Successfully',
            ];
        } catch (Exception $e) {
            DB::rollBack();

            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateBatch(Request $request, string $id)
    {

        $validated_req = $request->validate([
            'batch_name' => ['required', 'string', 'max:255'],
            'vat' => ['required', 'string', 'max:255'],
            'base_purchase_unit_price' => ['required', 'numeric', 'min:1'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'extra_costs' => ['nullable', 'array'],
            'inventory_items' => ['required', 'array'],
        ]);

        $validator = Validator::make($request->all(), [
            'extra_costs.*.cost_type' => ['required', 'string', 'max:255'],
            'extra_costs.*.amount' => ['required', 'numeric', 'min:1'],
            'inventory_items.*.smartphone_id' => ['required', 'exists:smartphones,id'],
            'inventory_items.*.storage_location_id' => ['required', 'exists:storage_locations,id'],
            'inventory_items.*.imei1' => ['required', 'string', 'max:255'],
            'inventory_items.*.imei2' => ['nullable', 'string', 'max:255'],
            'inventory_items.*.eid' => ['nullable', 'string', 'max:255'],
            'inventory_items.*.serial_no' => ['nullable', 'string', 'max:255'],
        ], [
            'extra_costs.*.cost_type.required' => 'Cost type is required',
            'extra_costs.*.cost_type.max' => 'Cost type Should Not Exceed 255 Characters',
            'extra_costs.*.cost_type.string' => 'Cost type Must Be A String',
            'extra_costs.*.amount.required' => 'Cost amount is required',
            'extra_costs.*.amount.numeric' => 'Cost amount Must Be Numeric',
            'extra_costs.*.amount.min' => 'Cost amount must be at least 1',

            'inventory_items.*.smartphone_id.required' => 'Smartphone ID is required',
            'inventory_items.*.smartphone_id.exists' => 'Smartphone ID does not exist',
            'inventory_items.*.storage_location_id.required' => 'Storage Location ID is required',
            'inventory_items.*.storage_location_id.exists' => 'Storage Location ID does not exist',
            'inventory_items.*.imei1.required' => 'IMEI 1 is required',
            'inventory_items.*.imei1.max' => 'IMEI 1 Should Not Exceed 255 Characters',
            'inventory_items.*.imei1.string' => 'IMEI 1 Must Be A String',
            'inventory_items.*.imei2.max' => 'IMEI 2 Should Not Exceed 255 Characters',
            'inventory_items.*.imei2.string' => 'IMEI 2 Must Be A String',
            'inventory_items.*.eid.max' => 'EID Should Not Exceed 255 Characters',
            'inventory_items.*.eid.string' => 'EID Must Be A String',
            'inventory_items.*.serial_no.max' => 'Serial Number Should Not Exceed 255 Characters',
            'inventory_items.*.serial_no.string' => 'Serial Number Must Be A String',

        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        // Uniqueness Checking Validation
        foreach ($validated_req['inventory_items'] as $index => $item) {
            $uniqueness_checker = Validator::make($item, [
                'imei1' => [
                    Rule::unique('inventories', 'imei1')->ignore($item['id'] ?? null),
                ],
                'imei2' => [
                    Rule::unique('inventories', 'imei2')->ignore($item['id'] ?? null),
                ],
                'eid' => [
                    Rule::unique('inventories', 'eid')->ignore($item['id'] ?? null),
                ],
                'serial_no' => [
                    Rule::unique('inventories', 'serial_no')->ignore($item['id'] ?? null),
                ],
            ], [
                'serial_no' => 'Serial Number Already Exists',
                'imei1' => 'IMEI 1 Already Exists',
                'imei2' => 'IMEI 2 Already Exists',
                'eid' => 'EID Already Exists',
            ]);

            if ($uniqueness_checker->fails()) {
                throw ValidationException::withMessages([
                    'file_error' => $uniqueness_checker->errors()->first(),
                ]);
            }
        }

        try {
            // dd($validated_req);
            DB::beginTransaction();

            $batch = $this->getSingleBatch($id);

            if (empty($batch)) {
                throw new Exception('Batch Not Found');
            }

            // checking Duplications

            // Checking For Imei 1
            $imei1s = array_column($validated_req['inventory_items'], 'imei1');
            $duplicate_imei1s = array_filter(array_count_values($imei1s), fn ($count) => $count > 1);

            if (! empty($duplicate_imei1s)) {
                throw new Exception('IMEI 1 cannot be duplicated');
            }

            // Checking For Imei 2
            $imei2s = array_filter(array_column($validated_req['inventory_items'], 'imei2'));
            $duplicate_imei2s = array_filter(array_count_values($imei2s), fn ($count) => $count > 1);

            if (! empty($duplicate_imei2s)) {
                throw new Exception('IMEI 2 cannot be duplicated');
            }

            // Checking For EID
            $eids = array_filter(array_column($validated_req['inventory_items'], 'eid'));
            $duplicate_eids = array_filter(array_count_values($eids), fn ($count) => $count > 1);

            if (! empty($duplicate_eids)) {
                throw new Exception('EID cannot be duplicated');
            }

            // Checking For Serial No
            $serial_nos = array_filter(array_column($validated_req['inventory_items'], 'serial_no'));
            $duplicate_serial_nos = array_filter(array_count_values($serial_nos), fn ($count) => $count > 1);

            if (! empty($duplicate_serial_nos)) {
                throw new Exception('Serial Number cannot be duplicated');
            }

            // Extracting Quantity
            $total_quantity = 0;
            foreach ($validated_req['inventory_items'] as $inventory_item) {
                $total_quantity += 1;
            }
            $validated_req['total_quantity'] = $total_quantity;

            $total_extra_cost = 0;
            if (! blank($validated_req['extra_costs'])) {
                foreach ($validated_req['extra_costs'] as $extra_cost) {
                    $total_extra_cost += $extra_cost['amount'];

                }
            }

            $total_batch_cost = $validated_req['total_quantity'] * $validated_req['base_purchase_unit_price'] + $total_extra_cost;
            $final_unit_price = $total_batch_cost / $validated_req['total_quantity'];

            $validated_req['total_batch_cost'] = $total_batch_cost;
            $validated_req['final_unit_price'] = $final_unit_price;

            $updated = $batch->update(array_filter($validated_req, function ($value, $key) {
                return ! in_array($key, ['inventory_items']);
            }, ARRAY_FILTER_USE_BOTH));

            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Batch');
            }

            // Delete all inventory items
            $this->inventory->where('batch_id', $batch->id)->delete();

            // Creating New Inventory Items From The Request Data
            foreach ($validated_req['inventory_items'] as $inventory_item) {
                $this->inventory->create([
                    'batch_id' => $batch->id,
                    'smartphone_id' => $inventory_item['smartphone_id'],
                    'storage_location_id' => $inventory_item['storage_location_id'],
                    'imei1' => $inventory_item['imei1'],
                    'imei2' => $inventory_item['imei2'],
                    'eid' => $inventory_item['eid'],
                    'serial_no' => $inventory_item['serial_no'],
                    'status' => $inventory_item['status'] ?? 'in_stock',
                    'returned_date' => $inventory_item['returned_date'] ?? null,
                ]);
            }

            Db::commit();

            return [
                'status' => true,
                'message' => 'Batch Updated Successfully',
            ];

        } catch (Exception $e) {
            DB::rollBack();

            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyBatch(string $id)
    {
        try {

            $batch = $this->batch->find($id);

            if (empty($batch)) {
                throw new Exception('Batch Not Found');
            }

            $deleted = $batch->delete();
            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Batch');
            }

            return [
                'status' => true,
                'message' => 'Batch Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyBatchBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');
            if (blank($ids)) {
                throw new Exception('Please Select Atleast One Batch');
            }

            $deleted = $this->batch->destroy($ids);

            if ($deleted !== count($ids)) {
                throw new Exception('Something Went Wrong While Deleting Batches');
            }

            return [
                'status' => true,
                'message' => 'Batches Deleted Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getSuppliers()
    {
        return $this->supplier->whereHas('user', fn ($query) => $query->where('is_active', 1))->with(['user'])->get()->map(function ($supplier) {
            return [
                'id' => $supplier->id,
                'name' => $supplier->user->name,
            ];
        });
    }
}
