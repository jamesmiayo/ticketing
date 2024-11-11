<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class DefaultAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('AUTHENTICATION') === 'LDAP'){
            $users = ['user.marketing', 'user.investigator', 'user.credit'];

            foreach ($users as $username) {
                User::create([
                    'emp_id' => mt_rand(1000, 9999),
                    'username' => $username,
                    'name' => $username,
                    'email' => "{$username}@example.com",
                    'password' => Hash::make('password')
                ]);
            }
        }else{
            User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'admin',
                'name' => 'admin',
                'email' => "admin@example.com",
                'password' => Hash::make('password')
            ]);
        }
    }
}
