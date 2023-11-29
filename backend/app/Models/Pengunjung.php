<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengunjung extends Model
{
    use HasFactory;
    protected $table = 'tb_pengunjung';
    protected $fillable = ['nama_pengunjung', 'nama_kegiatan', 'tahun'];
}
