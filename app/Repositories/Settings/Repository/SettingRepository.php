<?php

namespace App\Repositories\Settings\Repository;

use App\Models\Color;
use App\Models\GeneralSetting;
use App\Models\Role;
use App\Models\SmtpSetting;
use App\Repositories\Settings\Interface\ISettingRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SettingRepository implements ISettingRepository
{
    public function __construct(
        private GeneralSetting $general_setting,
        private SmtpSetting $smtp_setting,
        private Role $role,
        private Color $color,
    ) {}

    // General Setting
    public function getGenralSetting()
    {
        $general_setting = $this->general_setting->first();

        return $general_setting;
    }

    public function updateGeneralSetting(Request $request)
    {
        $validated_req = $request->validate([
            'app_name' => 'required|min:4|string|max:100',
            'contact_email' => 'required|email',
            'contact_number' => 'required|regex:/^\+\d+$/',
            ...($request->hasFile('app_main_logo_dark') ? ['app_main_logo_dark' => 'nullable|mimes:png|max:2048'] : []),
            ...($request->hasFile('app_main_logo_light') ? ['app_main_logo_light' => 'nullable|mimes:png|max:2048'] : []),
            ...($request->hasFile('app_favicon') ? ['app_favicon' => 'nullable|mimes:jpg,jpeg,png|max:2048'] : []),
        ], [
            'contact_number.regex' => 'The Contact Number must be a valid number And Starting With + Country Code - Example: +8801xxxxxxxxx',
        ]);

        try {
            $general_setting = $this->general_setting->first();

            $directory = public_path('assets/images/Logo/');

            if (! file_exists($directory)) {
                File::makeDirectory($directory, 0755, true, true);
            }

            if ($request->boolean('is_removed_app_main_logo_dark') && ! $request->hasFile('app_main_logo_dark')) {
                if (! empty($general_setting->app_main_logo_dark)) {
                    if (file_exists($directory.$general_setting->app_main_logo_dark)) {
                        File::delete($directory.$general_setting->app_main_logo_dark);
                        $validated_req['app_main_logo_dark'] = null;
                    }
                }
            }

            if ($request->boolean('is_removed_app_main_logo_light') && ! $request->hasFile('app_main_logo_light')) {

                if (! empty($general_setting->app_main_logo_light)) {
                    if (file_exists($directory.$general_setting->app_main_logo_light)) {
                        File::delete($directory.$general_setting->app_main_logo_light);
                        $validated_req['app_main_logo_light'] = null;
                    }
                }
            }

            if ($request->boolean('is_removed_app_favicon') && ! $request->hasFile('app_favicon')) {
                if (! empty($general_setting->app_favicon)) {
                    if (file_exists($directory.$general_setting->app_favicon)) {
                        File::delete($directory.$general_setting->app_favicon);
                        $validated_req['app_favicon'] = null;
                    }
                }
            }

            if ($request->hasFile('app_favicon')) {

                if (! empty($general_setting->app_favicon)) {
                    if (file_exists($directory.$general_setting->app_favicon)) {
                        File::delete($directory.$general_setting->app_favicon);
                    }
                }

                $favicon = $request->file('app_favicon');
                $new_favicon_name = time().uniqid().'.'.$favicon->getClientOriginalExtension();
                $validated_req['app_favicon'] = $new_favicon_name;
                $favicon->move($directory, $new_favicon_name);

            }
            if ($request->hasFile('app_main_logo_dark')) {

                if (! empty($general_setting->app_main_logo_dark)) {
                    if (file_exists($directory.$general_setting->app_main_logo_dark)) {
                        File::delete($directory.$general_setting->app_main_logo_dark);
                    }
                }

                $app_main_logo_dark = $request->file('app_main_logo_dark');
                $new_app_main_logo_dark_name = time().uniqid().'.'.$app_main_logo_dark->getClientOriginalExtension();
                $validated_req['app_main_logo_dark'] = $new_app_main_logo_dark_name;
                $app_main_logo_dark->move($directory, $new_app_main_logo_dark_name);

            }

            if ($request->hasFile('app_main_logo_light')) {

                if (! empty($general_setting->app_main_logo_light)) {
                    if (file_exists($directory.$general_setting->app_main_logo_light)) {
                        File::delete($directory.$general_setting->app_main_logo_light);
                    }
                }

                $app_main_logo_light = $request->file('app_main_logo_light');
                $new_app_main_logo_light_name = time().uniqid().'.'.$app_main_logo_light->getClientOriginalExtension();
                $validated_req['app_main_logo_light'] = $new_app_main_logo_light_name;
                $app_main_logo_light->move($directory, $new_app_main_logo_light_name);

            }

            if (! empty($general_setting)) {
                $general_setting->update($validated_req);

                return [
                    'status' => true,
                    'message' => 'General Setting Updated Successfully',
                ];
            }

            $this->general_setting->create($validated_req);

            return [
                'status' => true,
                'message' => 'General Setting Created Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    // Smtp Setting
    public function getSmtpSetting()
    {
        $smtp_setting = $this->smtp_setting->first();

        return $smtp_setting;
    }

    public function updateSmtpSetting(Request $request)
    {
        $validated_req = $request->validate([
            'smtp_mailer' => 'required|min:4',
            'smtp_scheme' => 'required|min:4',
            'smtp_host' => 'required',
            'smtp_port' => 'required|numeric',
            'smtp_username' => 'required|email',
            'smtp_password' => 'required',
            'smtp_mail_from_address' => 'required|email',
        ]);

        try {
            if ($this->smtp_setting->exists()) {
                $this->smtp_setting->first()->update($validated_req);

                return [
                    'status' => true,
                    'message' => 'SMTP Setting Updated Successfully',
                ];
            }

            $this->smtp_setting->create($validated_req);

            return [
                'status' => true,
                'message' => 'SMTP Setting Created Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    // Role Setting
    public function getAllRoles()
    {
        $roles = $this->role->latest()->paginate(10);

        return $roles;
    }

    public function getSingleRole($id)
    {
        $role = $this->role->find($id);

        return $role;
    }

    public function storeRole(Request $request)
    {
        $validated_req = $request->validate([
            'name' => 'required|unique:roles,name',
            'description' => 'nullable',
        ]);

        try {

            if ($this->role->create($validated_req)) {
                return [
                    'status' => true,
                    'message' => 'Role Created Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Creating Role');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateRole(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'name' => 'required|unique:roles,name,'.$id,
            'description' => 'nullable',
        ]);

        try {
            $system_defined_role_ids = [1, 2, 3, 4];
            $system_defined_role_names = ['Admin', 'Customer', 'Collaborator', 'Supplier'];

            $role = $this->getSingleRole($id);
            if (empty($role)) {
                throw new Exception('Role Not Found');
            }

            if (in_array($role->id, $system_defined_role_ids) && ! in_array($request->name, $system_defined_role_names)) {
                throw new Exception('System Defined Role Can Not Be Changed');
            }

            if ($role->update($validated_req)) {
                return [
                    'status' => true,
                    'message' => 'Role Updated Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Updating Role');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyRole(string $id)
    {
        try {

            $system_defined_role_ids = [1, 2, 3, 4];
            if (in_array($id, $system_defined_role_ids)) {
                throw new Exception('System Defined Role Can Not Be Deleted');
            }

            $role = $this->getSingleRole($id);
            if (empty($role)) {
                throw new Exception('Role Not Found');
            }

            if ($role->delete()) {
                return [
                    'status' => true,
                    'message' => 'Role Deleted Successfully',
                ];
            }

            throw new Exception('Something Went Wrong While Deleting Role');
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyRoleBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');

            if (blank($ids)) {
                throw new Exception('Please Select Atleast One Role');
            }

            $system_defined_role_ids = [1, 2, 3, 4];

            foreach ($ids as $id) {
                if (in_array($id, $system_defined_role_ids)) {
                    throw new Exception('System Defined Role Can Not Be Deleted');
                }
            }

            $deleted = $this->role->destroy($ids);

            if ($deleted !== count($ids)) {
                return [
                    'status' => false,
                    'message' => 'Something Went Wrong While Deleting Role',
                ];
            }

            return [
                'status' => true,
                'message' => 'Role Deleted Successfully',
            ];

        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getAllColors()
    {
        $colors = $this->color->latest()->paginate(10);

        return $colors;
    }

    public function getSingleColor($id)
    {
        $color = $this->color->find($id);

        return $color;
    }

    public function storeColor(Request $request)
    {
        $validated_req = $request->validate([
            'name' => ['required', 'max:255', 'unique:colors,name'],
            'code' => ['required', 'max:255', 'starts_with:#', 'unique:colors,code'],
            'is_active' => ['required', 'boolean'],
        ]);

        try {
            $created = $this->color->create($validated_req);

            if (empty($created)) {
                throw new Exception('Something Went Wrong While Creating Color');
            }

            return [
                'status' => true,
                'message' => 'Color Created Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateColor(Request $request, string $id)
    {
        $validated_req = $request->validate([
            'name' => ['required', 'max:255', 'unique:colors,name,'.$id],
            'code' => ['required', 'max:255', 'starts_with:#', 'unique:colors,code,'.$id],
            'is_active' => ['required', 'boolean'],
        ]);

        try {
            $color = $this->getSingleColor($id);

            if (empty($color)) {
                throw new Exception('Color Not Found');
            }

            $updated = $color->update($validated_req);

            if (! $updated) {
                throw new Exception('Something Went Wrong While Updating Color');
            }

            return [
                'status' => true,
                'message' => 'Color Updated Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyColor(string $id)
    {
        try {
            $color = $this->getSingleColor($id);

            if (empty($color)) {
                throw new Exception('Color Not Found');
            }

            $deleted = $color->delete();

            if (! $deleted) {
                throw new Exception('Something Went Wrong While Deleting Color');
            }

            return [
                'status' => true,
                'message' => 'Color Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function destroyColorBySelection(Request $request)
    {
        try {
            $ids = $request->array('ids');

            if (blank($ids)) {
                throw new Exception('Please Select Atleast One Color');
            }

            $deleted = $this->color->destroy($ids);

            if ($deleted !== count($ids)) {
                throw new Exception('Something Went Wrong While Deleting Color');
            }

            return [
                'status' => true,
                'message' => 'Color Deleted Successfully',
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
