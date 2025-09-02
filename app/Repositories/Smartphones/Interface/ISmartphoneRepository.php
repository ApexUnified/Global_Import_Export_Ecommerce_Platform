<?php

namespace App\Repositories\Smartphones\Interface;

use Illuminate\Http\Request;

interface ISmartphoneRepository
{
    public function getAllSmartphones(Request $request);

    public function getSingleSmartphone(string $id);

    public function storeSmartphone(Request $request);

    public function updateSmartphone(Request $request, string $id);

    public function destroySmartphone(string $id);

    public function destroySmartphoneBySelection(Request $request);

    public function getColors();

    public function getModelNames();

    public function getCapacities();

    public function getCategories();
}
