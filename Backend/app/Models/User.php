<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
class User extends Authenticatable
{
    use HasApiTokens , HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'emp_id',
        'username'
    ];

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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function checkPassword(string $password): bool {
        return Hash::check($password, $this->password);
    }

    public static function destroyToken(){
        return Auth::user()->tokens()->delete();
    }

    public function branch() {
        return $this->belongsTo(Branch::class);
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function tickethdr()
    {
        return $this->hasMany(TicketHdr::class, 'emp_id');
    }
}
