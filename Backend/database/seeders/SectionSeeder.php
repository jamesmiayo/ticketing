<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Section;

class SectionSeeder extends Seeder
{
    public function run()
    {
        // Creating sections using the create method
        Section::create([
            'section_id' => 'S001',
            'section_description' => 'Recruitment',
            'department_id' => 1, // This assumes a department with ID 1 exists; adjust as needed
            'b_active' => true,
        ]);

        Section::create([
            'section_id' => 'S002',
            'section_description' => 'Payroll',
            'department_id' => 2, // This assumes a department with ID 2
            'b_active' => true,
        ]);

        Section::create([
            'section_id' => 'S003',
            'section_description' => 'Infrastructure',
            'department_id' => 3, // This assumes a department with ID 3
            'b_active' => true,
        ]);
    }
}
