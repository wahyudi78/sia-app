<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\GuruResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\MapelResource;
use App\Http\Resources\RuanganResource;
use Illuminate\Http\Resources\Json\JsonResource;

class NilaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ,
            'nilai' => $this->nilai ,
            'waktu' => $this->waktu,
            // 'guru' => new GuruResource($this->gurus),
            'siswa' => new UserResource($this->user),
            'jadwal' => new JadwalResource($this->jadwal),
            
          ];
    }
}
