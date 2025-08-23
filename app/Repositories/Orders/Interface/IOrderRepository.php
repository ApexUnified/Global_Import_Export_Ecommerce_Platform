<?php

namespace App\Repositories\Orders\Interface;

use Illuminate\Http\Request;

interface IOrderRepository
{
    public function getAllOrders(Request $request);

    public function getSingleOrder(string $id);

    public function storeOrder(Request $request);

    public function updateOrder(Request $request, string $id);

    public function destroyOrder(string $id);

    public function destroyOrderBySelection(Request $request);

    public function updateCashCollectedStatus(string $id);

    public function getSmartphones();

    public function getCustomers();

    public function customerOrderInvoiceByOrderNo(Request $request, string $order_no);

    public function ShippingOrderInvoice(Request $request, string $order_no);
}
