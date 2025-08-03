<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {

        $roles = [
            ['name' => 'Admin', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Customer', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Collaborator', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Supplier', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
        ];
        Role::insert($roles);
    }
}
