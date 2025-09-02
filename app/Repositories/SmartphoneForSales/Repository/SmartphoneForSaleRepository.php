<?php

namespace App\Repositories\SmartphoneForSales\Repository;

use App\Models\AdditionalFeeList;
use App\Models\SmartphoneForSale;
use App\Repositories\SmartphoneForSales\Interface\ISmartphoneForSaleRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SmartphoneForSaleRepository implements ISmartphoneForSaleRepository
{
    public function __construct(
        private SmartphoneForSale $smartphone_for_sale,
        private AdditionalFeeList $additional_fee_list,
    ) {}

    public function getAllSmartphoneForSales(Request $request)
    {
        $smartphone_for_sales = $this->smartphone_for_sale
            ->when(! empty($request->input('search')), function ($query) use ($request) {
                $query->whereHas('smartphone.model_name', function ($subQ) use ($request) {
                    $subQ->where('name', 'like', '%'.$request->input('search').'%');
                });
            })
            ->with(['smartphone', 'smartphone.model_name'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return $smartphone_for_sales;
    }

    public function getSingleSmartphoneForSale(string $id)
    {
        $smartphone_for_sale = $this->smartphone_for_sale->find($id);

        return $smartphone_for_sale;
    }

    public function storeSmartphoneForSale(Request $request)
    {
        $validated_req = $request->validate([
            'smartphone_id' => ['required', 'exists:smartphones,id', 'unique:smartphone_for_sales,smartphone_id'],
            'selling_price' => ['required', 'numeric', 'min:1'],
            'additional_fee' => ['nullable', 'array'],

        ], [
            'smartphone_id.required' => 'Smartphone is required',
            'smartphone_id.exists' => 'Smartphone is not valid',
            'smartphone_id.unique' => 'Smartphone is already Exists',
        ]);

        $validator = Validator::make($request->all(), [
            'additional_fee.*.type' => ['required', 'string', 'max:255'],
            'additional_fee.*.amount' => ['required', 'numeric', 'min:1'],
        ], [
            'additional_fee.*.type.required' => 'Additional fee type is required',
            'additional_fee.*.type.max' => 'Additional fee type Should Not Exceed 255 Characters',
            'additional_fee.*.type.string' => 'Additional fee type Must Be A String',
            'additional_fee.*.amount.required' => 'Additional fee amount is required',
            'additional_fee.*.amount.numeric' => 'Additional fee amount Must Be Numeric',
            'additional_fee.*.amount.min' => 'Additional fee amount must be at least 1',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'message' => $validator->errors()->first(),
            ];
        }

        try {

            $total_price = (float) $validated_req['selling_price'];

            if (isset($validated_req['additional_fee'])) {
                foreach ($validated_req['additional_fee'] as $fee) {
                    $total_price += (float) $fee['amount'];
                }
            }

            $validated_req['total_price'] = $total_price;
            $created = $this->smartphone_for_sale->create($validated_req);
            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating Smartphone For Sale');
            }

            return [
                'status' => true,
                'message' => 'Smartphone For Sale Created Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateSmartphoneForSale(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'smartphone_id' => ['required', 'exists:smartphones,id', 'unique:smartphone_for_sales,smartphone_id,'.$id],
            'selling_price' => ['required', 'numeric', 'min:1'],
            'additional_fee' => ['nullable', 'array'],

        ], [
            'smartphone_id.required' => 'Smartphone ID is required',
            'smartphone_id.exists' => 'Smartphone ID is not valid',
            'smartphone_id.unique' => 'Smartphone ID is already used',
        ]);

        $validator = Validator::make($request->all(), [
            'additional_fee.*.type' => ['required', 'string', 'max:255'],
            'additional_fee.*.amount' => ['required', 'numeric', 'min:1'],
        ], [
            'additional_fee.*.type.required' => 'Additional fee type is required',
            'additional_fee.*.type.max' => 'Additional fee type Should Not Exceed 255 Characters',
            'additional_fee.*.type.string' => 'Additional fee type Must Be A String',
            'additional_fee.*.amount.required' => 'Additional fee amount is required',
            'additional_fee.*.amount.numeric' => 'Additional fee amount Must Be Numeric',
            'additional_fee.*.amount.min' => 'Additional fee amount must be at least 1',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'message' => $validator->errors()->first(),
            ];
        }

        try {

            $smartphone_for_sale = $this->getSingleSmartphoneForSale($id);

            if (empty($smartphone_for_sale)) {
                throw new Exception('Smartphone For Sale Not Found');
            }

            $total_price = (float) $validated_req['selling_price'];

            if (isset($validated_req['additional_fee'])) {
                foreach ($validated_req['additional_fee'] as $fee) {
                    $total_price += (float) $fee['amount'];
                }
            }

            $validated_req['total_price'] = $total_price;

            $updated = $smartphone_for_sale->update($validated_req);
            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Smartphone For Sale');
            }

            return [
                'status' => true,
                'message' => 'Smartphone For Sale Updated Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroySmartphoneForSale(string $id)
    {
        try {
            $smartphone_for_sale = $this->getSingleSmartphoneForSale($id);

            if (empty($smartphone_for_sale)) {
                throw new Exception('Smartphone For Sale Not Found');
            }

            $deleted = $smartphone_for_sale->delete();
            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Smartphone For Sale');
            }

            return [
                'status' => true,
                'message' => 'Smartphone For Sale Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroySmartphoneForSaleBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');
            if (blank($ids)) {
                throw new Exception('Please Select Atleast One Smartphone For Sale');
            }

            $deleted = $this->smartphone_for_sale->destroy($ids);

            if ($deleted !== count($ids)) {
                throw new Exception('Something Went Wrong While Deleting Smartphone For Sales');
            }

            return [
                'status' => true,
                'message' => 'Smartphone For Sales Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getAllAdditionalFeeLists()
    {
        return $this->additional_fee_list->where('is_active', true)->get()->map(function ($list) {
            return [
                'name' => $list->name,
            ];
        });
    }
}
