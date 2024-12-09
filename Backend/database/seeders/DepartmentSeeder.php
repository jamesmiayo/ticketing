<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Division;
use App\Models\Branch;
class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Branch::create([
            'branch_id' => 'D0012',
            'branch_description' => 'Head Office Branch'
        ]);

        $division = Division::create([
            'division_id' => 'D0012',
            'division_description' => 'Information Technology'
        ]);

        $division1 = Division::create([
            'division_id' => 'D0012',
            'division_description' => 'Marketing Department'
        ]);

        // Creating departments using the create method
        Department::create([
            'division_id' => $division1->id,
            'department_id' => 'D001',
            'department_description' => 'Finance',
            'b_active' => true,
        ]);

        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D002',
            'department_description' => 'Application Dev',
            'b_active' => true,
        ]);

        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D003',
            'department_description' => 'Help Desk',
            'b_active' => true,
        ]);

        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D003',
            'department_description' => 'Infrastructure',
            'b_active' => true,
        ]);
    }
}
