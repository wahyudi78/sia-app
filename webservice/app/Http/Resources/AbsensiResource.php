<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\MapelResource;
use App\Http\Resources\JadwalResource;
use App\Http\Resources\RuanganResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AbsensiResource extends JsonResource
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
            'guru' => new UserResource($this->user),
            'jadwal' => new JadwalResource($this->jadwal),

            'keterangan' => $this->keterangan ,
            'waktu' => $this->waktu,
            'jam' => $this->jam,
          ];
        // return parent::toArray($request);
    }
}
