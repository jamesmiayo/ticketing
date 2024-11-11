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
            'emp_id' => 1,
            'subcategory_id' => 1,
            'title' => $this->faker->sentence,
            'body' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['0', '1', '2']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
