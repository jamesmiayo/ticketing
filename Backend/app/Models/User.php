<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

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
        'username',
        'branch_id',
        'section_id',
        'profile_picture',
        'phone_number'
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

    protected function profilePicture(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value
                ? asset('storage/' . $value)
                : asset('storage/default_profile.jpg')
        );
    }
    public function checkPassword(string $password): bool
    {
        return Hash::check($password, $this->password);
    }

    public static function destroyToken()
    {
        return Auth::user()->tokens()->delete();
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function ticket_notification()
    {
        return $this->hasMany(TicketNotification::class);
    }

    public function tickethdr()
    {
        return $this->hasMany(TicketHdr::class, 'emp_id');
    }

    public function ticketdtl()
    {
        return $this->hasMany(TicketStatus::class, 'emp_id')->latest()->take(1);
    }

    public static function getUserData($searchParams)
    {
        $query = self::with('roles', 'branch', 'section', 'section.department', 'section.department.division');

        if (array_key_exists('employee_id', $searchParams) && $searchParams['employee_id'] !== null) {
            $query->employeeId($searchParams['employee_id']);
        }

        if (array_key_exists('name', $searchParams) && $searchParams['name'] !== null) {
            $query->name($searchParams['name']);
        }

        if (array_key_exists('role_id', $searchParams) && $searchParams['role_id'] !== null) {
            $query->role($searchParams['role_id']);
        }

        return $query;
    }

    public function scopeEmployeeId($query, $employee_id)
    {
        return $query->where('emp_id', 'LIKE', '%' . $employee_id . '%');
    }

    public function scopeName($query, $name)
    {

        return $query->where('name', 'LIKE', '%' . $name . '%');
    }

    public function scopeRole($query, $id)
    {
        return $query->whereHas('roles', function ($roleQuery) use ($id) {
            $roleQuery->where('id', $id);
        });
    }
    public function satisfactoryPercentage()
{
    return $this->ticketdtl
        ->filter(function ($ticket) {
            return optional($ticket->tickets->ticket_satisfactory)->average_satisfactory !== null;
        })
        ->map(function ($ticket) {
            return optional($ticket->tickets->ticket_satisfactory)->average_satisfactory;
        })
        ->pipe(function ($averages) {
            $totalSum = $averages->sum();
            $totalCount = $averages->count();
            return $totalCount > 0 ? ($totalSum / $totalCount) : 0;
        });
}

}
