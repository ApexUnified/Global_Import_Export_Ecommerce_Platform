<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\Settings\Interface\ISettingRepository;
use Artisan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(
        private ISettingRepository $setting
    ) {}

    // Menu Page

    public function index()
    {
        return Inertia::render('Dashboard/Settings/index');
    }

    // General Setting
    public function generalSetting()
    {
        $general_setting = $this->setting->getGenralSetting();

        return Inertia::render('Dashboard/Settings/GeneralSetting/index', compact('general_setting'));
    }

    public function updateGeneralSetting(Request $request)
    {
        $updated = $this->setting->updateGeneralSetting($request);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        Artisan::call('queue:restart');

        return back()->with('success', $updated['message']);
    }

    // Smtp Setting
    public function smtpSetting()
    {
        $smtp_setting = $this->setting->getSmtpSetting();

        return Inertia::render('Dashboard/Settings/SMTPSetting/index', compact('smtp_setting'));
    }

    public function updateSmtpSetting(Request $request)
    {
        $updated = $this->setting->updateSmtpSetting($request);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        Artisan::call('queue:restart');

        return back()->with('success', $updated['message']);
    }

    // Role Setting
    public function roleIndex()
    {
        $roles = $this->setting->getAllRoles();

        return Inertia::render('Dashboard/Settings/Roles/index', compact('roles'));
    }

    public function roleCreate()
    {
        return Inertia::render('Dashboard/Settings/Roles/create');
    }

    public function roleStore(Request $request)
    {
        $created = $this->setting->storeRole($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.roles.index')->with('success', $created['message']);
    }

    public function roleEdit(?string $id = null)
    {

        if (empty($id)) {
            return to_route('dashboard.settings.roles.index')->with('error', 'Role ID not found');
        }

        $role = $this->setting->getSingleRole($id);

        if (empty($role)) {
            return to_route('dashboard.settings.roles.index')->with('error', 'Role not found');
        }

        return Inertia::render('Dashboard/Settings/Roles/edit', compact('role'));
    }

    public function roleUpdate(Request $request, ?string $id = null)
    {

        if (empty($id)) {
            return back()->with('error', 'Role ID not found');
        }

        $updated = $this->setting->updateRole($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.roles.index')->with('success', $updated['message']);
    }

    public function roleDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Role ID not found');
        }
        $deleted = $this->setting->destroyRole($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.roles.index')->with('success', $deleted['message']);
    }

    public function destroyRoleBySelection(Request $request)
    {
        $deleted = $this->setting->destroyRoleBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.roles.index')->with('success', $deleted['message']);
    }

    // Color Methods
    public function colorIndex()
    {
        $colors = $this->setting->getAllColors();

        return Inertia::render('Dashboard/Settings/Colors/index', compact('colors'));
    }

    public function colorCreate()
    {
        return Inertia::render('Dashboard/Settings/Colors/create');
    }

    public function colorStore(Request $request)
    {
        $created = $this->setting->storeColor($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.colors.index')->with('success', $created['message']);
    }

    public function colorEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.colors.index')->with('error', 'Color ID not found');
        }

        $color = $this->setting->getSingleColor($id);

        if (empty($color)) {
            return to_route('dashboard.settings.colors.index')->with('error', 'Color not found');
        }

        return Inertia::render('Dashboard/Settings/Colors/edit', compact('color'));
    }

    public function colorUpdate(Request $request, ?string $id = null)
    {

        if (empty($id)) {
            return back()->with('error', 'Color ID not found');
        }

        $updated = $this->setting->updateColor($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.colors.index')->with('success', $updated['message']);
    }

    public function colorDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Color ID not found');
        }

        $deleted = $this->setting->destroyColor($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.colors.index')->with('success', $deleted['message']);
    }

    public function destroyColorBySelection(Request $request)
    {
        $deleted = $this->setting->destroyColorBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.colors.index')->with('success', $deleted['message']);
    }

    // Model Name Methods

    public function modelNameIndex()
    {
        $model_names = $this->setting->getAllModelNames();

        return Inertia::render('Dashboard/Settings/ModelNames/index', compact('model_names'));
    }

    public function modelNameCreate()
    {
        return Inertia::render('Dashboard/Settings/ModelNames/create');
    }

    public function modelNameStore(Request $request)
    {
        $created = $this->setting->storeModelName($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.model_names.index')->with('success', $created['message']);
    }

    public function modelNameEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.model_names.index')->with('error', 'Model Name ID not found');
        }

        $model_name = $this->setting->getSingleModelName($id);

        if (empty($model_name)) {
            return to_route('dashboard.settings.model_names.index')->with('error', 'Model Name not found');
        }

        return Inertia::render('Dashboard/Settings/ModelNames/edit', compact('model_name'));
    }

    public function modelNameUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Model Name ID not found');
        }

        $updated = $this->setting->updateModelName($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.model_names.index')->with('success', $updated['message']);
    }

    public function modelNameDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Model Name ID not found');
        }

        $deleted = $this->setting->destroyModelName($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.model_names.index')->with('success', $deleted['message']);
    }

    public function destroyModelNameBySelection(Request $request)
    {
        $deleted = $this->setting->destroyModelNameBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.model_names.index')->with('success', $deleted['message']);
    }

    public function capacityIndex()
    {
        $capacities = $this->setting->getAllCapacities();

        return Inertia::render('Dashboard/Settings/Capacities/index', compact('capacities'));
    }

    public function capacityCreate()
    {
        return Inertia::render('Dashboard/Settings/Capacities/create');
    }

    public function capacityStore(Request $request)
    {
        $created = $this->setting->storeCapacity($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.capacities.index')->with('success', $created['message']);
    }

    public function capacityEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.capacities.index')->with('error', 'Capacity ID not found');
        }

        $capacity = $this->setting->getSingleCapacity($id);

        if (empty($capacity)) {
            return to_route('dashboard.settings.capacities.index')->with('error', 'Capacity not found');
        }

        return Inertia::render('Dashboard/Settings/Capacities/edit', compact('capacity'));
    }

    public function capacityUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Capacity ID not found');
        }

        $updated = $this->setting->updateCapacity($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.capacities.index')->with('success', $updated['message']);
    }

    public function capacityDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Capacity ID not found');
        }

        $deleted = $this->setting->destroyCapacity($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.capacities.index')->with('success', $deleted['message']);
    }

    public function destroyCapacityBySelection(Request $request)
    {
        $deleted = $this->setting->destroyCapacityBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return to_route('dashboard.settings.capacities.index')->with('success', $deleted['message']);
    }

    // Storage Locations
    public function storageLocationIndex()
    {
        $storage_locations = $this->setting->getAllStorageLocations();

        return Inertia::render('Dashboard/Settings/StorageLocations/index', compact('storage_locations'));
    }

    public function storageLocationCreate()
    {
        return Inertia::render('Dashboard/Settings/StorageLocations/create');
    }

    public function storageLocationStore(Request $request)
    {
        $created = $this->setting->storeStorageLocation($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.storage_locations.index')->with('success', $created['message']);
    }

    public function storageLocationEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.storage_locations.index')->with('error', 'Storage Location ID not found');
        }

        $storage_location = $this->setting->getSingleStorageLocation($id);

        if (empty($storage_location)) {
            return to_route('dashboard.settings.storage_locations.index')->with('error', 'Storage Location not found');
        }

        return Inertia::render('Dashboard/Settings/StorageLocations/edit', compact('storage_location'));
    }

    public function storageLocationUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Storage Location ID not found');
        }

        $updated = $this->setting->updateStorageLocation($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.storage_locations.index')->with('success', $updated['message']);
    }

    public function storageLocationDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Storage Location ID not found');
        }

        $deleted = $this->setting->destroyStorageLocation($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyStorageLocationBySelection(Request $request)
    {
        $deleted = $this->setting->destroyStorageLocationBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    // Currencies Methods

    public function currencyIndex()
    {
        $currencies = $this->setting->getAllCurrencies();

        return Inertia::render('Dashboard/Settings/Currencies/index', compact('currencies'));
    }

    public function currencyCreate()
    {
        return Inertia::render('Dashboard/Settings/Currencies/create');
    }

    public function currencyStore(Request $request)
    {
        $created = $this->setting->storeCurrency($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.currencies.index')->with('success', $created['message']);
    }

    public function currencyEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.currencies.index')->with('error', 'Currency ID not found');
        }

        $currency = $this->setting->getSingleCurrency($id);

        if (empty($currency)) {
            return to_route('dashboard.settings.currencies.index')->with('error', 'Currency not found');
        }

        return Inertia::render('Dashboard/Settings/Currencies/edit', compact('currency'));
    }

    public function currencyUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Currency ID not found');
        }

        $updated = $this->setting->updateCurrency($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.currencies.index')->with('success', $updated['message']);
    }

    public function currencyDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Currency ID not found');
        }

        $deleted = $this->setting->destroyCurrency($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyCurrencyBySelection(Request $request)
    {
        $deleted = $this->setting->destroyCurrencyBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function toggleCurrencyStatus(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Currency ID not found');
        }

        $updated = $this->setting->toggleCurrencyStatus($id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return back()->with('success', $updated['message']);
    }

    // Additional Fee lists

    public function additionalFeeListIndex()
    {
        $additional_fee_lists = $this->setting->getAllAdditionalFeeLists();

        return Inertia::render('Dashboard/Settings/AdditionalFeeLists/index', compact('additional_fee_lists'));
    }

    public function additionalFeeListCreate()
    {
        return Inertia::render('Dashboard/Settings/AdditionalFeeLists/create');
    }

    public function additionalFeeListStore(Request $request)
    {
        $created = $this->setting->storeAdditionalFeeList($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.additional_fee_lists.index')->with('success', $created['message']);
    }

    public function additionalFeeListEdit(?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.additional_fee_lists.index')->with('error', 'Additional Fee List ID not found');
        }

        $additional_fee_list = $this->setting->getSingleAdditionalFeeList($id);

        if (empty($additional_fee_list)) {
            return to_route('dashboard.settings.additional_fee_lists.index')->with('error', 'Additional Fee List not found');
        }

        return Inertia::render('Dashboard/Settings/AdditionalFeeLists/edit', compact('additional_fee_list'));
    }

    public function additionalFeeListUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Additional Fee List ID not found');
        }

        $updated = $this->setting->updateAdditionalFeeList($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.additional_fee_lists.index')->with('success', $updated['message']);
    }

    public function additionalFeeListDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Additional Fee List ID not found');
        }

        $deleted = $this->setting->destroyAdditionalFeeList($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyAdditionalFeeListBySelection(Request $request)
    {
        $deleted = $this->setting->destroyAdditionalFeeListBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    // Reward Point Setting Method

    public function rewardPointSettingIndex()
    {
        $reward_point_setting = $this->setting->getRewardPointSetting();

        return Inertia::render('Dashboard/Settings/RewardSettings/index', compact('reward_point_setting'));
    }

    public function rewardPointSettingUpdate(Request $request)
    {
        $updated = $this->setting->updateRewardPointSetting($request);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return back()->with('success', $updated['message']);
    }

    // Commission Setting methods

    public function commissionSettingIndex()
    {
        $commission_settings = $this->setting->getAllCommissionSettings();

        return Inertia::render('Dashboard/Settings/CommissionSettings/index', compact('commission_settings'));
    }

    public function commissionSettingCreate()
    {
        return Inertia::render('Dashboard/Settings/CommissionSettings/create');
    }

    public function commissionSettingStore(Request $request)
    {
        $created = $this->setting->storeCommissionSetting($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.commission-settings.index')->with('success', $created['message']);
    }

    public function commissionSettingEdit(?string $id = null)
    {

        if (empty($id)) {
            return to_route('dashboard.settings.commission-settings.index')->with('error', 'Commission Setting ID not found');
        }

        $commission_setting = $this->setting->getSingleCommissionSetting($id);
        if (empty($commission_setting)) {
            return to_route('dashboard.settings.commission-settings.index')->with('error', 'Commission Setting not found');
        }

        return Inertia::render('Dashboard/Settings/CommissionSettings/edit', compact('commission_setting'));
    }

    public function commissionSettingUpdate(Request $request, ?string $id = null)
    {

        if (empty($id)) {
            return back()->with('error', 'Commission Setting ID not found');
        }

        $updated = $this->setting->updateCommissionSetting($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.commission-settings.index')->with('success', $updated['message']);
    }

    public function destroyCommissionSetting(?string $id = null)
    {

        if (empty($id)) {
            return back()->with('error', 'Commission Setting ID not found');
        }

        $deleted = $this->setting->destroyCommissionSetting($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function destroyCommissionSettingBySelection(Request $request)
    {
        $deleted = $this->setting->destroyCommissionSettingBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);

    }

    // Countries
    public function countryIndex(Request $request)
    {
        $countries = $this->setting->getAllCountries($request);
        $search = $request->input('search');

        return Inertia::render('Dashboard/Settings/Countries/index', compact('countries', 'search'));
    }

    public function countryCreate()
    {
        return Inertia::render('Dashboard/Settings/Countries/create');
    }

    public function countryStore(Request $request)
    {
        $created = $this->setting->storeCountry($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.countries.index')->with('success', $created['message']);
    }

    public function countryEdit(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.countries.index')->with('error', 'Country ID not found');
        }

        $country = $this->setting->getSingleCountry($id);
        if (empty($country)) {
            return to_route('dashboard.settings.countries.index')->with('error', 'Country not found');
        }

        return Inertia::render('Dashboard/Settings/Countries/edit', compact('country'));
    }

    public function countryUpdate(Request $request, ?string $id = null)
    {
        if (empty($id)) {
            return to_route('dashboard.settings.countries.index')->with('error', 'Country ID not found');
        }

        $updated = $this->setting->updateCountry($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.countries.index')->with('success', $updated['message']);
    }

    public function countryDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Country ID not found');
        }

        $deleted = $this->setting->destroyCountry($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function countryDestroyBySelection(Request $request)
    {
        $deleted = $this->setting->destroyCountryBySelection($request);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    // Special Country
    public function specialCountryIndex(Request $request)
    {
        $special_countries = $this->setting->getAllSpecialCountries($request);
        $search = $request->input('search');

        return Inertia::render('Dashboard/Settings/SpecialCountries/index', compact('special_countries', 'search'));

    }

    public function specialCountryCreate()
    {
        $countries = $this->setting->getCountries();

        return Inertia::render('Dashboard/Settings/SpecialCountries/create', compact('countries'));
    }

    public function specialCountryStore(Request $request)
    {
        $created = $this->setting->storeSpecialCountry($request);

        if ($created['status'] === false) {
            return back()->with('error', $created['message']);
        }

        return to_route('dashboard.settings.special-countries.index')->with('success', $created['message']);
    }

    public function specialCountryDestroy(?string $id = null)
    {
        if (empty($id)) {
            return back()->with('error', 'Special Country ID Not Found');
        }

        $deleted = $this->setting->destroySpecialCountry($id);

        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);
    }

    public function specialCountryDestroyBySelection(Request $request)
    {
        $deleted = $this->setting->destroySpecialCountryBySelection($request);
        if ($deleted['status'] === false) {
            return back()->with('error', $deleted['message']);
        }

        return back()->with('success', $deleted['message']);

    }
}
