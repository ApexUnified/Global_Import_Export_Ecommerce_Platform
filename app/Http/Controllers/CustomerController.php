<?php

namespace App\Http\Controllers;

use App\Repositories\Customers\Interface\ICustomerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        private ICustomerRepository $customer
    ) {}

    public function index(Request $request)
    {
        $customers = $this->customer->getAllCustomers($request);

        $search = $request->input('search');

        return Inertia::render('Dashboard/Customers/index', compact('customers', 'search'));
    }

    public function create()
    {
        return Inertia::render('Dashboard/Customers/create');
    }

    public function store(Request $request)
    {
        $created = $this->customer->storeCustomer($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.customers.index')->with('success', $created['message']);
    }

    public function show(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Customer ID Not Found');
        }

        $customer = $this->customer->getSingleCustomer($id);

        if (empty($customer)) {

            return back()->with('error', 'Customer Not Found');
        }

        return Inertia::render('Dashboard/Customers/show', compact('customer'));
    }

    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Customer ID Not Found');
        }

        $customer = $this->customer->getSingleCustomer($id);

        if (empty($customer)) {

            return back()->with('error', 'Customer Not Found');
        }

        return Inertia::render('Dashboard/Customers/edit', compact('customer'));
    }

    public function update(Request $request, string $id)
    {
        $updated = $this->customer->updateCustomer($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.customers.index')->with('success', $updated['message']);
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Customer ID Not Found');
        }

        $deleted = $this->customer->destroyCustomer($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->customer->destroyCustomerBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }
}
