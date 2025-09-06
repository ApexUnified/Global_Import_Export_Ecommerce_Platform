<?php

namespace App\Repositories\Dashboard\Interface;

use Illuminate\Http\Request;

interface IDashboardRepository
{
    public function getTotalUsersCount();

    public function getTotalCustomersCount();

    public function getTotalSuppliersCount();

    public function getTotalCollaboratorsCount();

    public function getTotalDistributorsCount();

    public function getTotalPostsCount();

    public function getOrdersForChart(Request $request);

    public function getMonths($months_count = 12);

    public function getPurchasingCustomersType();

    public function getShippingStatusesCount();

    public function getCollaboratorPerformance();

    public function getDistributorPerformance();

    public function getSupplierPerformance();
}
