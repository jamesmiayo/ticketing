<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        // Creating departments using the create method
        Department::create([
            'department_id' => 'D001',
            'department_description' => 'Human Resources',
            'b_active' => true,
        ]);

        Department::create([
            'department_id' => 'D002',
            'department_description' => 'Finance',
            'b_active' => true,
        ]);

        Department::create([
            'department_id' => 'D003',
            'department_description' => 'IT Department',
            'b_active' => true,
        ]);
    }
}
