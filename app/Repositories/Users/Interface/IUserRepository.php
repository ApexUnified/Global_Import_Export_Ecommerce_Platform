<?php

namespace App\Repositories\Users\Interface;

use Illuminate\Http\Request;

interface IUserRepository
{
    public function getSingleUser(string $id);

    public function updateProfile(Request $request);

    public function updatePassword(Request $request);

    public function destroyAccount(Request $request);
}
