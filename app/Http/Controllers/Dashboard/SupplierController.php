<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Suppliers\Interface\ISupplierRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function __construct(
        private ISupplierRepository $supplier
    ) {}

    public function index(Request $request)
    {
        $suppliers = $this->supplier->getAllSuppliers($request);

        $search = $request->input('search');

        return Inertia::render('Dashboard/Suppliers/index', compact('suppliers', 'search'));
    }

    public function create()
    {
        return Inertia::render('Dashboard/Suppliers/create');
    }

    public function store(Request $request)
    {
        $created = $this->supplier->storeSupplier($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.suppliers.index')->with('success', $created['message']);
    }

    public function show(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.suppliers.index')->with('error', 'Supplier ID Not Found');
        }

        $supplier = $this->supplier->getSingleSupplier($id);
        if (empty($supplier)) {
            return to_route('dashboard.suppliers.index')->with('error', 'Supplier Not Found');
        }

        return Inertia::render('Dashboard/Suppliers/show', compact('supplier'));
    }

    public function edit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.suppliers.index')->with('error', 'Supplier ID Not Found');
        }

        $supplier = $this->supplier->getSingleSupplier($id);
        if (empty($supplier)) {
            return to_route('dashboard.suppliers.index')->with('error', 'Supplier Not Found');
        }

        return Inertia::render('Dashboard/Suppliers/edit', compact('supplier'));
    }

    public function update(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Supplier ID Not Found');
        }
        $updated = $this->supplier->updateSupplier($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.suppliers.index')->with('success', $updated['message']);
    }

    public function destroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Supplier ID Not Found');
        }

        $deleted = $this->supplier->destroySupplier($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.suppliers.index')->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->supplier->destroySupplierBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.suppliers.index')->with('success', $deleted['message']);
    }
}
