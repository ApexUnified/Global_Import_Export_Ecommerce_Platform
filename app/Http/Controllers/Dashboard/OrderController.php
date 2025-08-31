<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Orders\Interface\IOrderRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        private IOrderRepository $order
    ) {}

    public function index(Request $request)
    {
        $orders = $this->order->getAllOrders($request);
        $search = $request->input('search');
        $status = $request->input('status');

        return Inertia::render('Dashboard/Orders/index', compact('orders', 'search', 'status'));
    }

    public function create()
    {
        $smartphones = $this->order->getSmartphones();
        $customers = $this->order->getCustomers();

        return Inertia::render('Dashboard/Orders/create', compact('smartphones', 'customers'));
    }

    public function store(Request $request)
    {
        $created = $this->order->storeOrder($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.orders.index')->with('success', $created['message']);
    }

    public function show(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.orders.index')->with('error', 'Order Id not found');
        }

        $order = $this->order->getSingleOrder($id);

        if (empty($order)) {
            return to_route('dashboard.orders.index')->with('error', 'Order not found');
        }

        // return $order;

        return Inertia::render('Dashboard/Orders/show', compact('order'));
    }

    public function edit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.orders.index')->with('error', 'Order Id not found');
        }

        $order = $this->order->getSingleOrder($id);

        if (empty($order)) {
            return to_route('dashboard.orders.index')->with('error', 'Order not found');
        }

        if ($order->status === 'delivered') {
            return back()->with('error', 'Already Completed Orders Cannot Be Edited');
        }

        $smartphones = $this->order->getSmartphones();
        $customers = $this->order->getCustomers();

        return Inertia::render('Dashboard/Orders/edit', compact('order', 'smartphones', 'customers'));
    }

    public function update(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Order Id not found');
        }
        $updated = $this->order->updateOrder($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.orders.index')->with('success', $updated['message']);
    }

    public function destroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Order Id not found');
        }

        $deleted = $this->order->destroyOrder($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyBySelection(Request $request)
    {
        $deleted = $this->order->destroyOrderBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function updateCashCollectedStatus(?string $id = null)
    {

        if (empty($id)) {
            return back()->with('error', 'Order ID Not Found');
        }

        $updated = $this->order->updateCashCollectedStatus($id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return back()->with('success', $updated['message']);
    }

    public function customerOrderInvoice(Request $request, ?string $order_no = null)
    {

        if (empty($order_no)) {
            return back()->with('info', 'Invoice No. Is Missing');
        }

        $response = $this->order->customerOrderInvoiceByOrderNo($request, $order_no);

        if ($response['status'] === false) {
            return to_route('home')->with('info', $response['message']);
        }

        $order = $response['order'];

        return Inertia::render('Dashboard/Orders/CustomerOrderInvoice', compact('order'));
    }

    public function shippingInvoice(Request $request, ?string $order_no = null)
    {
        if (empty($order_no)) {
            return back()->with('info', 'Invoice No. Is Missing');
        }

        $response = $this->order->ShippingOrderInvoice($request, $order_no);

        if ($response['status'] === false) {
            return back()->with('info', $response['message']);
        }

        $order = $response['order'];

        return Inertia::render('Dashboard/Orders/ShippingInvoice', compact('order'));
    }
}
