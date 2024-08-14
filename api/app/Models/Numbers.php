<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Numbers extends Model
{
    use HasFactory;

    // Defina os campos que podem ser preenchidos
    protected $fillable = ['number']; // Altere 'number' para o nome da coluna correspondente na sua tabela
}
