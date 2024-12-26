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
            'Can View Admin Dashboard',
            'Can View Supervisor Dashboard',
            'Can View Maintenance',
            'Can View User Ticket',
            'Can View Category Table List',
            'Can View Branch Table List',
            'Can View Ticket Table List',
            'Can View Ticket Priority',
            'Can View Today Summary',
            'Can Change Priority',
            'Can Done Ticket',
            'Can Change Assignee',
            'Can Change Division Assignee',
            'Can Change Department Assignee',
            'Can Change Section Assignee',
            'Can Modify Ticket',
            'Can View Ticket Remarks',
            'Can Create FAQs',
            'Can Update FAQs',
            'Can Create SLA',
            'Can Update SLA',
            'Can View SLA Reports',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        $editorRole = Role::where('name', 'Admin')->first();
        $editorRole->syncPermissions(Permission::all());
    }
}