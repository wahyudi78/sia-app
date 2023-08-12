<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pembayaran>
 */
class PembayaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'  => 1,
            'order_id'   => rand(),
            'gross_amount'   => 1500000,
            'waktu'    => fake()->date(),
            'status'    => rand(1,3),
        ];
    }
}
