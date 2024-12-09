<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Division;
use App\Models\Branch;
use App\Models\Section;
class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Branch::create([
            'branch_id' => 'D0012',
            'branch_description' => 'Head Office Branch'
        ]);

        $data = [
            [
                'division' => 'IT GROUP',
                'departments' => [
                    [
                        'name' => 'HELPDESK DEPARTMENT',
                        'sections' => ['L1 HELPDESK', 'L2 HELPDESK'],
                    ],
                    [
                        'name' => 'INFRASTRUCTURE DEPARTMENT',
                        'sections' => ['DATABASE ADMINISTRATOR', 'SYSTEM ADMINISTRATOR', 'NETWORK ADMINISTRATOR'],
                    ],
                    [
                        'name' => 'IT APPLICATION AND SYSTEMS DEPARTMENT',
                        'sections' => ['APPLICATION DEVELOPER', 'QUALITY ASSURANCE TESTER', 'SYSTEM BUSINESS ANALYST'],
                    ],
                ],
            ],
            [
                'division' => 'LOANS GROUP',
                'departments' => [
                    [
                        'name' => 'LOANS PROCESS DEPARTMENT',
                        'sections' => [
                            'BRANCH GROUP LOAN PROCESSOR',
                            'SPECIAL ACCOUNT GROUP LOAN PROCESSOR',
                            'BNCT & REAL ESTATES GROUP LOAN PROCESSOR',
                            'LOAN PROCESSOR TRAINING',
                        ],
                    ],
                    [
                        'name' => 'LOANS DOCUMENTATION AND WAREHOUSING',
                        'sections' => [
                            'COLLATERAL CUSTODIAN (HEAD OFFICE VAULT)',
                            'COLLATERAL CUSTODIAN',
                            'DOCUMENTATION PROCESSOR',
                            'LOAN DOCUMENTATION',
                        ],
                    ],
                ],
            ],
            [
                'division' => 'PQA GROUP',
                'departments' => [
                    [
                        'name' => 'PROCESS QUALITY ASSURANCE DEPARTMENT',
                        'sections' => ['PQA ASSOCIATE'],
                    ],
                ],
            ],
            [
                'division' => 'CUSTOMER CARE GROUP',
                'departments' => [
                    [
                        'name' => 'CUSTOMER CARE UNIT (BRANCH HELPDESK)',
                        'sections' => ['CUSTOMER CARE REPRESENTATIVE'],
                    ],
                    [
                        'name' => 'CUSTOMER CARE UNIT (CUSTOMER AFFAIRS DESK)',
                        'sections' => ['CUSTOMER AFFAIRS DESK'],
                    ],
                ],
            ],
            [
                'division' => 'INTERNAL COLLECTION GROUP',
                'departments' => [
                    [
                        'name' => 'INTERNAL COLLECTION DEPARTMENT',
                        'sections' => ['COLLECTION SPECIALIST'],
                    ],
                ],
            ],
        ];

        foreach ($data as $divisionData) {
            $division = Division::create([
                'division_id' => mt_rand(1000, 9999),
                'division_description' => $divisionData['division'],
            ]);

            foreach ($divisionData['departments'] as $departmentData) {
                $department = Department::create([
                    'department_id' => mt_rand(1000, 9999),
                    'division_id' => $division->id,
                    'department_description' => $departmentData['name'],
                ]);

                foreach ($departmentData['sections'] as $sectionName) {
                    Section::create([
                        'department_id' => $department->id,
                        'section_id' => mt_rand(1000, 9999),
                        'section_description' => $sectionName,
                    ]);
                }
            }
        }
    }
}
