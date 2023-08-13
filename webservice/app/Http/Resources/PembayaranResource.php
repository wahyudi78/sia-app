<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PembayaranResource extends JsonResource
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
            'pembayaran' => $this->pembayaran ,
            'bulan' => $this->bulan ,
            'guru' => new UserResource($this->user),
            'order_id' => $this->order_id ,
            'total' => $this->total ,
            'status' => $this->status
          ];
    }
}
