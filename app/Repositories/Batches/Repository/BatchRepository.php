<?php

namespace App\Repositories\Batches\Repository;

use App\Models\Batch;
use App\Models\Supplier;
use App\Repositories\Batches\Interface\IBatchRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BatchRepository implements IBatchRepository
{
    public function __construct(
        private Batch $batch,
        private Supplier $supplier,
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
            ->with(['supplier', 'supplier.user'])
            ->find($id);

        return $batch;
    }

    public function storeBatch(Request $request)
    {
        $validated_req = $request->validate([
            'batch_name' => ['required', 'string', 'max:255'],
            'total_quantity' => ['required', 'numeric', 'min:1'],
            'base_purchase_unit_price' => ['required', 'numeric', 'min:1'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'extra_costs' => ['nullable', 'array'],
        ]);

        $validator = Validator::make($request->all(), [
            'extra_costs.*.cost_type' => ['required', 'string', 'max:255'],
            'extra_costs.*.amount' => ['required', 'numeric', 'min:1'],
        ], [
            'extra_costs.*.cost_type.required' => 'Cost type is required',
            'extra_costs.*.cost_type.max' => 'Cost type Should Not Exceed 255 Characters',
            'extra_costs.*.cost_type.string' => 'Cost type Must Be A String',
            'extra_costs.*.amount.required' => 'Cost amount is required',
            'extra_costs.*.amount.numeric' => 'Cost amount Must Be Numeric',
            'extra_costs.*.amount.min' => 'Cost amount must be at least 1',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        try {
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

            $created = $this->batch->create($validated_req);
            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating Batch');
            }

            return [
                'status' => true,
                'message' => 'Batch Created Successfully',
            ];
        } catch (Exception $e) {
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
            'total_quantity' => ['required', 'numeric', 'min:1'],
            'base_purchase_unit_price' => ['required', 'numeric', 'min:1'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'extra_costs' => ['nullable', 'array'],
        ]);

        $validator = Validator::make($request->all(), [
            'extra_costs.*.cost_type' => ['required', 'string', 'max:255'],
            'extra_costs.*.amount' => ['required', 'numeric', 'min:1'],
        ], [
            'extra_costs.*.cost_type.required' => 'Cost type is required',
            'extra_costs.*.cost_type.max' => 'Cost type Should Not Exceed 255 Characters',
            'extra_costs.*.cost_type.string' => 'Cost type Must Be A String',
            'extra_costs.*.amount.required' => 'Cost amount is required',
            'extra_costs.*.amount.numeric' => 'Cost amount Must Be Numeric',
            'extra_costs.*.amount.min' => 'Cost amount must be at least 1',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'file_error' => $validator->errors()->first(),
            ]);
        }

        try {

            $batch = $this->getSingleBatch($id);

            if (empty($batch)) {
                throw new Exception('Batch Not Found');
            }

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

            $updated = $batch->update($validated_req);
            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Batch');
            }

            return [
                'status' => true,
                'message' => 'Batch Updated Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyBatch(string $id)
    {
        try {

            $batch = $this->getSingleBatch($id);

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
