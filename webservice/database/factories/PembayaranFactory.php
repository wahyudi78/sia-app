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
            'pembayaran' => "Pembayaran SPP",
            'bulan' => "Agustus",
            'order_id'   => rand(),
            'total'   => 1500000,
            'status'    => rand(1,3),
        ];
    }
}
