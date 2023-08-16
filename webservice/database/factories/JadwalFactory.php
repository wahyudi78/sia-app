<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jadwal>
 */
class JadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 2,
            'mapel_id' => rand(1,2),
            'hari' => fake()->name(),
            'mulai' => fake()->time(),
            'selesai' => fake()->time(),
            'ruangan_id'   => rand(1,2),
            
        ];
    }
}
