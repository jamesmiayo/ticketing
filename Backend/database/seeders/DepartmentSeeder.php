<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Division;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        $division = Division::create([
            'division_id' => 'D0012',
            'division_description' => 'Division'
        ]);
        // Creating departments using the create method
        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D001',
            'department_description' => 'Human Resources',
            'b_active' => true,
        ]);

        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D002',
            'department_description' => 'Finance',
            'b_active' => true,
        ]);

        Department::create([
            'division_id' => $division->id,
            'department_id' => 'D003',
            'department_description' => 'IT Department',
            'b_active' => true,
        ]);
    }
}
