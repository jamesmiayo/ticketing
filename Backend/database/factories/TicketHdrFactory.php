<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TicketHdr>
 */
class TicketHdrFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ticket_id' => mt_rand(1000, 9999),
            'emp_id' => 1,
            'subcategory_id' => 1,
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph,
            'b_status' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
