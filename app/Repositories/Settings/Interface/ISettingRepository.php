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
}
