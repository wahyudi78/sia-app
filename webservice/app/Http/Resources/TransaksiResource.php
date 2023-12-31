<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransaksiResource extends JsonResource
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
            'kode' => $this->kode ,
            'pembayaran' => new PembayaranResource($this->pembayaran),
            'siswa' => new UserResource($this->user),
            
            'waktu' => $this->waktu,
            'status' => $this->status
          ];
    }
}
