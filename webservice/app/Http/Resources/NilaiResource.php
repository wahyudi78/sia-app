<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
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
            'siswa' => new SiswaResource($this->siswa),
            'guru' => new GuruResource($this->guru),
            'ruang' => new RuanganResource($this->ruangan), 
            'mapel' => new MapelResource($this->mapel)
          ];
    }
}