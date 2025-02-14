<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Division;
use App\Models\Department;
use App\Models\Section;

class OrganizationSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'division' => 'Sales Re Financing',
                'departments' => [
                    [
                        'name' => 'Regional South Luzon Sales',
                        'sections' => ['South Luzon 1', 'South Luzon 2', 'South Luzon 3'],
                    ],
                    [
                        'name' => 'Regional NCR Sales',
                        'sections' => ['NCR 1', 'NCR 2'],
                    ],
                    [
                        'name' => 'Regional Central North Luzon',
                        'sections' => ['Central Luzon', 'North Luzon'],
                    ],
                    [
                        'name' => 'Regional Visayas Mindanao Sales',
                        'sections' => ['Visayas', 'Mindanao'],
                    ],
                ],
            ],
            [
                'division' => 'Sales Financing',
                'departments' => [
                    [
                        'name' => 'SAU Sales',
                        'sections' => ['Area 1', 'Area 2', 'Area 3'],
                    ],
                    [
                        'name' => 'Relationship Department',
                        'sections' => ['Relationship Section'],
                    ],
                    [
                        'name' => 'Operations Department',
                        'sections' => ['Operations Section'],
                    ],
                ],
            ],
            [
                'division' => 'Sales Brand new cars',
                'departments' => [
                    [
                        'name' => 'Product Department (BNEW CAR)',
                        'sections' => ['Product Section (BNEW CAR)'],
                    ],
                ],
            ],
            [
                'division' => 'Sales Real estate',
                'departments' => [
                    [
                        'name' => 'Product Department (REM)',
                        'sections' => ['Product Section (REM)'],
                    ],
                ],
            ],
            [
                'division' => 'Sales Trucks',
                'departments' => [
                    [
                        'name' => 'Product Department (TRUCKS)',
                        'sections' => ['Product Section (TRUCKS)'],
                    ],
                ],
            ],
            [
                'division' => 'Marketing Group',
                'departments' => [
                    [
                        'name' => 'Business Development',
                        'sections' => ['Relationship Section', 'Product Section'],
                    ],
                    [
                        'name' => 'Corp Communication',
                        'sections' => ['Social Media', 'Digital Marketing'],
                    ],
                    [
                        'name' => 'Customer Service',
                        'sections' => ['Customer Service'],
                    ],
                ],
            ],
            [
                'division' => 'Operation',
                'departments' => [
                    [
                        'name' => 'Loans Department',
                        'sections' => ['Loans Section'],
                    ],
                    [
                        'name' => 'Office Admin',
                        'sections' => ['Admin Section'],
                    ],
                    [
                        'name' => 'Aquired Asset Management and Disposal',
                        'sections' => ['Aquired Asset', 'Disposal Section'],
                    ],
                ],
            ],
            [
                'division' => 'Finance Group',
                'departments' => [
                    [
                        'name' => 'Tax and Financial Compliance',
                        'sections' => ['Tax Section', 'Compliance Section'],
                    ],
                    [
                        'name' => 'Finance and Accounting',
                        'sections' => ['Finance Section', 'Accounting Section'],
                    ],
                    [
                        'name' => 'Treasury',
                        'sections' => ['Treasury Section'],
                    ],
                ],
            ],
            [
                'division' => 'HR Group',
                'departments' => [
                    [
                        'name' => 'HR Operations',
                        'sections' => ['HR Operations Section'],
                    ],
                    [
                        'name' => 'Talent Development',
                        'sections' => ['Talent Development'],
                    ],
                ],
            ],
            [
                'division' => 'IT Group',
                'departments' => [
                    [
                        'name' => 'IT Application and Systems Department',
                        'sections' => ['Business Analyst', 'Developers'],
                    ],
                    [
                        'name' => 'IT Infrastructure',
                        'sections' => ['Network Admins', 'Database Admins', 'System Admins', 'Application Support'],
                    ],
                    [
                        'name' => 'Helpdesk',
                        'sections' => ['Technical Support', 'Level 2 Technical Support'],
                    ],
                ],
            ],
            [
                'division' => 'Process Improvement Group',
                'departments' => [
                    [
                        'name' => 'System and Methods',
                        'sections' => ['System', 'Methods'],
                    ],
                    [
                        'name' => 'Process Quality Assurance',
                        'sections' => ['Process Quality'],
                    ],
                ],
            ],
            [
                'division' => 'Risk Group',
                'departments' => [
                    [
                        'name' => 'Risk Management',
                        'sections' => ['Risk Section'],
                    ],
                    [
                        'name' => 'ECL and Data Analytics',
                        'sections' => ['ECL', 'Analytics'],
                    ],
                ],
            ],
            [
                'division' => 'Credit and Collection Group',
                'departments' => [
                    [
                        'name' => 'Credit Commitee',
                        'sections' => ['Crecom Section'],
                    ],
                    [
                        'name' => 'Credit Review',
                        'sections' => ['Crd Section'],
                    ],
                    [
                        'name' => 'Credit Investigation',
                        'sections' => ['Credit Investigation Section'],
                    ],
                    [
                        'name' => 'Internal Collection',
                        'sections' => ['Internal Collection Section'],
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
                        'section_id' => mt_rand(1000, 9999),
                        'department_id' => $department->id,
                        'section_description' => $sectionName,
                    ]);
                }
            }
        }
    }
}
