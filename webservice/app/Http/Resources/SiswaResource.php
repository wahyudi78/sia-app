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
    // function __construct(User $user)
    // {
    //     parent::__construct($user);
    // }


    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id ,
          'nomor_induk' => $this->nomor_induk ,
          'name' => $this->name ,
          'tanggal_lahir' => $this->tanggal_lahir ,
          'agama' => $this->agama ,
          'username' => $this->username ,
          'ruangan_id' => $this->ruangan_id ,
          'role' => $this->role ,
        ];
    }
}
