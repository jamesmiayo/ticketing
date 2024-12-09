<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'CRM' => [
                'Login',
                'Change Loan Consultant Name',
                'Return Document from Releasing to Loans',
                'Editing Details',
                'Unable to Proceed from Loans to Releasing',
            ],
            'SOFIA' => [
                'Edit OR details',
                'Reversal of entries',
                'Edit PDC List',
                'Delete double Cash in bank',
                'CM Deletion',
                'Undo release',
                'Duplicate PN number',
            ],
            'Hardware Issues' => [
                'Computer/Workstation',
                'Printer/Scanner',
                'Network Devices (Router, Switches)',
                'Peripheral Devices (Keyboard, Mouse, Monitors)',
            ],
            'Software Issues' => [
                'Operating System (Windows, macOS, Linux)',
                'Application Software (Microsoft Office, Adobe Suite, etc.)',
                'Development Tools (IDEs, Git, Docker)',
                'Custom/Internal Applications',
            ],
            'Network & Connectivity' => [
                'Internet Access',
                'VPN Issues',
                'Intranet/Local Network Issues',
                'Slow Network Performance',
            ],
            'Account & Access Management' => [
                'Password Resets',
                'Access Permissions (File/Folder, Database)',
                'Single Sign-On Issues',
                'Account Lockout',
            ],
            'Security & Compliance' => [
                'Antivirus/Malware Detection',
                'Suspicious Activity',
                'Data Breach/Leakage Concerns',
                'Phishing & Email Security',
            ],
            'Email & Communication' => [
                'Email Delivery Issues',
                'Calendar Syncing',
                'Messaging Apps (Teams, Slack)',
                'Email Configuration',
            ],
            'Printing & Scanning' => [
                'Printer Setup/Configuration',
                'Print Queue Errors',
                'Scanner Not Responding',
                'Print Quality Issues',
            ],
            'File Storage & Backup' => [
                'Cloud Storage Issues',
                'Backup Failures',
                'File Recovery/Restore',
                'File Access/Permissions',
            ],
            'Performance Issues' => [
                'System Lag/Slow Response',
                'Application Freezing/Crashing',
                'High CPU/RAM Usage',
                'Disk Space Management',
            ],
            'Website/Portal Issues' => [
                'Login Issues',
                'Page Load Errors',
                'Broken Links/Forms',
                'Feature Bugs',
            ],
        ];

        $totalCategories = count($data);
        $halfCategories = (int) ceil($totalCategories / 2);
        $index = 0;

        foreach ($data as $categoryName => $subcategories) {
            $divisionId = ($index < $halfCategories) ? 1 : 2;
            $category = Category::create(['division_id' => $divisionId, 'category_id' => mt_rand(1000, 9999), 'category_description' => $categoryName]);

            foreach ($subcategories as $subcategoryName) {
                Subcategory::create([
                    'subcategory_id' => mt_rand(1000, 9999),
                    'category_id' => $category->id,
                    'subcategory_description' => $subcategoryName,
                ]);
            }

            $index++;
        }
    }
}
