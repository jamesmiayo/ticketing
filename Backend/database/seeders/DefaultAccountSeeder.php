<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;
class DefaultAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Head' , 'Manager' , 'Supervisor', 'Tech' , 'User'];

        foreach ($roles as $roleName) {
            Role::create(['name' => $roleName]);
        }

        if (env('AUTHENTICATION') === 'LDAP'){

            $users = ['user.marketing', 'user.investigator', 'user.credit' , 'user.specialist'];

            $supervisor = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'user.marketing',
                'name' => 'User Marketing',
                'email' => 'user.marketing@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 1,
                'branch_id' => 1
            ]);

            $supervisor->assignRole('Admin');

            $manager = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'user.investigator',
                'name' => 'User Investigator',
                'email' => 'user.investigator@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 2,
                'branch_id' => 1
            ]);

            $manager->assignRole('manager');

            $tech = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'user.credit',
                'name' => 'User Credit',
                'email' => 'user.credit@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 3,
                'branch_id' => 1
            ]);

            $tech->assignRole('tech');
        }else{

            $supervisor = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'supervisor',
                'name' => 'supervisor',
                'email' => 'supervisor@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 1
            ]);

            $supervisor->assignRole('Supervisor');

            $manager = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'manager',
                'name' => 'manager',
                'email' => 'manager@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 2
            ]);

            $manager->assignRole('Manager');

            $tech = User::create([
                'emp_id' => mt_rand(1000, 9999),
                'username' => 'tech',
                'name' => 'tech',
                'email' => 'tech@gmail.com',
                'password' => Hash::make('password'),
                'section_id' => 3
            ]);

            $tech->assignRole('tech');
        }
    }
}
