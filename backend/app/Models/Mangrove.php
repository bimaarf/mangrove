<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mangrove extends Model
{
    use HasFactory;
    protected $table = 'tb_mangrove';
    protected $fillable = ['tempat', 'jumlah_mangrove', 'tahun'];
}
