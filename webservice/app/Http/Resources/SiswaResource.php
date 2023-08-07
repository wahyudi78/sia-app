<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiswaResource extends JsonResource
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
          'nis' => $this->nis ,
          'nama' => $this->nama ,
          'alamat' => $this->alamat ,
          'user_account' => $this->user_account ,
          'role' => $this->role ,
        ];
    }
}
