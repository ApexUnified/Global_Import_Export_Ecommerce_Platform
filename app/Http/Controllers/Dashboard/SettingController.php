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
}
