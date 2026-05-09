<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    public $table = 'categorias';
    protected $fillable = [
        'nombre',
        'icono',
    ];

    
}
