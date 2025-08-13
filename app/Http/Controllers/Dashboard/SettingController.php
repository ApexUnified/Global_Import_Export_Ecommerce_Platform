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

    public function roleEdit(string $id)
    {

        if (empty($id)) {
            return back()->with('error', 'Role ID not found');
        }

        $role = $this->setting->getSingleRole($id);

        if (empty($role)) {
            return back()->with('error', 'Role not found');
        }

        return Inertia::render('Dashboard/Settings/Roles/edit', compact('role'));
    }

    public function roleUpdate(Request $request, string $id)
    {
        $updated = $this->setting->updateRole($request, $id);

        if ($updated['status'] === false) {
            return back()->with('error', $updated['message']);
        }

        return to_route('dashboard.settings.roles.index')->with('success', $updated['message']);
    }

    public function roleDestroy(string $id)
    {
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

    public function colorEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Color ID not found');
        }

        $color = $this->setting->getSingleColor($id);

        if (empty($color)) {
            return back()->with('error', 'Color not found');
        }

        return Inertia::render('Dashboard/Settings/Colors/edit', compact('color'));
    }

    public function colorUpdate(Request $request, string $id)
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

    public function colorDestroy(string $id)
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

    public function modelNameEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Model Name ID not found');
        }

        $model_name = $this->setting->getSingleModelName($id);

        if (empty($model_name)) {
            return back()->with('error', 'Model Name not found');
        }

        return Inertia::render('Dashboard/Settings/ModelNames/edit', compact('model_name'));
    }

    public function modelNameUpdate(Request $request, string $id)
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

    public function modelNameDestroy(string $id)
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

    public function capacityEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Capacity ID not found');
        }

        $capacity = $this->setting->getSingleCapacity($id);

        if (empty($capacity)) {
            return back()->with('error', 'Capacity not found');
        }

        return Inertia::render('Dashboard/Settings/Capacities/edit', compact('capacity'));
    }

    public function capacityUpdate(Request $request, string $id)
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

    public function capacityDestroy(string $id)
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

    public function storageLocationEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Storage Location ID not found');
        }

        $storage_location = $this->setting->getSingleStorageLocation($id);

        if (empty($storage_location)) {
            return back()->with('error', 'Storage Location not found');
        }

        return Inertia::render('Dashboard/Settings/StorageLocations/edit', compact('storage_location'));
    }

    public function storageLocationUpdate(Request $request, string $id)
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

    public function storageLocationDestroy(string $id)
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

    public function currencyEdit(string $id)
    {
        if (empty($id)) {
            return back()->with('error', 'Currency ID not found');
        }

        $currency = $this->setting->getSingleCurrency($id);

        if (empty($currency)) {
            return back()->with('error', 'Currency not found');
        }

        return Inertia::render('Dashboard/Settings/Currencies/edit', compact('currency'));
    }

    public function currencyUpdate(Request $request, string $id)
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

    public function currencyDestroy(string $id)
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

    public function toggleCurrencyStatus(string $id)
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
}
