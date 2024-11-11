<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'Can Create Branch',
            'Can Update Branch',
            'Can Create Department',
            'Can Update Department',
            'Can Create Section',
            'Can Update Section',
            'Can Create Category',
            'Can Update Category',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        $editorRole = Role::create(['name' => 'IT Application Developer Supervisor']);
        $editorRole->givePermissionTo(Permission::all());
        $editorRole = Role::create(['name' => 'IT Application Developer']);
        $editorRole->givePermissionTo(Permission::all());

    }
}