<?php

namespace App\Models;

use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\Ruangan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Absensi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class);
    }
    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }
    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class);
    }
   
}
