<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrukturOrganisasi extends Model
{
    use HasFactory;
    protected $table = 'tb_struktur_organisasi';
    protected $fillable = [
        'ketua',
        'sekretaris',
        'bendahara',
        'perencanaan_dan_program',
        'pendidikan_lingkungan_hidup',
        'pengembangan_usaha',
        'desa_pasir',
        'desa_penibung',
        'desa_sungai_bakau_besar',
        'desa_sungai_bakau_kecil',
        'desa_sungai_purun_kecil',
    ];
}
