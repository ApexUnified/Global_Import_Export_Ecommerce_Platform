<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Batches\Interface\IBatchRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function __construct(
        private IBatchRepository $batch
    ) {}

    public function index(Request $request)
    {
        $batches = $this->batch->getAllBatches($request);
        $search = $request->input('search');

        return Inertia::render('Dashboard/Batches/index', compact('batches', 'search'));
    }

    public function create()
    {
        $suppliers = $this->batch->getSuppliers();

        return Inertia::render('Dashboard/Batches/create', compact('suppliers'));
    }

    public function store(Request $request)
    {
        $created = $this->batch->storeBatch($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.batches.index')->with('success', $created['message']);
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Batch ID Not Found');
        }

        $batch = $this->batch->getSingleBatch($id);

        if (empty($batch)) {
            return back()->with('error', 'Batch Not Found');
        }

        $suppliers = $this->batch->getSuppliers();

        return Inertia::render('Dashboard/Batches/edit', compact('batch', 'suppliers'));

    }

    public function update(Request $request, string $id)
    {
        $updated = $this->batch->updateBatch($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.batches.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Batch ID Not Found');
        }

        $deleted = $this->batch->destroyBatch($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->batch->destroyBatchBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
