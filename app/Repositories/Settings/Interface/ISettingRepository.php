<?php

namespace App\Repositories\Settings\Interface;

use Illuminate\Http\Request;

interface ISettingRepository
{
    // General Setting
    public function getGenralSetting();

    public function updateGeneralSetting(Request $request);

    // Smtp Setting
    public function getSmtpSetting();

    public function updateSmtpSetting(Request $request);

    // Role Setting
    public function getAllRoles();

    public function getSingleRole($id);

    public function storeRole(Request $request);

    public function updateRole(Request $request, string $id);

    public function destroyRole(string $id);

    public function destroyRoleBySelection(Request $request);

    // Colors
    public function getAllColors();

    public function getSingleColor($id);

    public function storeColor(Request $request);

    public function updateColor(Request $request, string $id);

    public function destroyColor(string $id);

    public function destroyColorBySelection(Request $request);

    // Model Names
    public function getAllModelNames();

    public function getSingleModelName(string $id);

    public function storeModelName(Request $request);

    public function updateModelName(Request $request, string $id);

    public function destroyModelName(string $id);

    public function destroyModelNameBySelection(Request $request);

    // Capcacites
    public function getAllCapacities();

    public function getSingleCapacity(string $id);

    public function storeCapacity(Request $request);

    public function updateCapacity(Request $request, string $id);

    public function destroyCapacity(string $id);

    public function destroyCapacityBySelection(Request $request);

    // Storage Locations
    public function getAllStorageLocations();

    public function getSingleStorageLocation(string $id);

    public function storeStorageLocation(Request $request);

    public function updateStorageLocation(Request $request, string $id);

    public function destroyStorageLocation(string $id);

    public function destroyStorageLocationBySelection(Request $request);

    // Currencies

    public function getAllCurrencies();

    public function getSingleCurrency(string $id);

    public function storeCurrency(Request $request);

    public function updateCurrency(Request $request, string $id);

    public function destroyCurrency(string $id);

    public function destroyCurrencyBySelection(Request $request);

    public function toggleCurrencyStatus(string $id);

    // Additional Fees List

    public function getAllAdditionalFeeLists();

    public function getSingleAdditionalFeeList(string $id);

    public function storeAdditionalFeeList(Request $request);

    public function updateAdditionalFeeList(Request $request, string $id);

    public function destroyAdditionalFeeList(string $id);

    public function destroyAdditionalFeeListBySelection(Request $request);

    // Reward Setting

    public function getRewardPointSetting();

    public function updateRewardPointSetting(Request $request);

    // Commission Setting

    public function getAllCommissionSettings();

    public function getSingleCommissionSetting(string $id);

    public function storeCommissionSetting(Request $request);

    public function updateCommissionSetting(Request $request, string $id);

    public function destroyCommissionSetting(string $id);

    public function destroyCommissionSettingBySelection(Request $request);
}
