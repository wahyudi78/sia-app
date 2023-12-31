<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Nilai;
use App\Models\Pembayaran;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }
    public function nilai()
    {
        return $this->hasMany(Nilai::class);
    }
    public function jadwal()
    {
        return $this->hasMany(Nilai::class);
    }
    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }
    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class);
    }
    public function absensi()
    {
        return $this->hasMany(Absensi::class);
    }
    
}
