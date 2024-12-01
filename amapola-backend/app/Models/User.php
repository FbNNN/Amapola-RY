<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];

    /**
     * Los atributos que deben ser ocultados para la serialización.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Los atributos que deben ser casteados a tipos de datos específicos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Método para obtener el rol del usuario.
     * 
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Método para verificar si el usuario tiene un rol específico.
     * 
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    /**
     * Método para establecer el rol del usuario.
     *
     * @param string $role
     * @return void
     */
    public function setRole($role)
    {
        $this->role = $role;
        $this->save();
    }

    /**
     * Método para verificar si el usuario es un administrador.
     * 
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
