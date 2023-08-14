<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\RuanganResource;
use App\Http\Resources\UserDetailResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserResource extends JsonResource
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
            'name' => $this->name ,
            'nomor_induk' => $this->nomor_induk ,
            'tanggal_lahir' => $this->tanggal_lahir ,
            'agama' => $this->agama ,
            'alamat' => $this->alamat ,
            'username' => $this->username ,
            'password' => $this->password ,
            'ruangan' => new RuanganResource($this->ruangan),
            
            'role' => $this->role ,
            
          ];
        
    }
}
