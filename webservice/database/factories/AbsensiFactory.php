<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absensi>
 */
class AbsensiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'keterangan'   => rand(1,2),
            'waktu'  => fake()->date(),
            'jam'  => fake()->time(),
            'jadwal_id' => 1,
            'user_id'    => 1,
           
        ];
    }
}
