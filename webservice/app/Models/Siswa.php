<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function nilai()
    {
        return $this->hasMany(Nilai::class);
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
