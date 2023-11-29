<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_struktur_organisasi', function (Blueprint $table) {
            $table->id();
            $table->string('ketua')->default('Ketua');
            $table->string('sekretaris')->default('Sekretaris');
            $table->string('bendahara')->default('Bendahara');
            $table->string('perencanaan_dan_program')->default('Perencanaan dan Program');
            $table->string('pendidikan_lingkungan_hidup')->default('Pendidikan Lingkungan Hidup');
            $table->string('pengembangan_usaha')->default('Pengembangan Usaha');
            $table->string('desa_pasir')->default('Desa Pasir');
            $table->string('desa_penibung')->default('Desa Penibung');
            $table->string('desa_sungai_bakau_besar')->default('Desa Sungai Bakau Besar');
            $table->string('desa_sungai_bakau_kecil')->default('Desa Sungai Bakau Kecil');
            $table->string('desa_sungai_purun_kecil')->default('Desa Sungai Purun Kecil');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_struktur_organisasi');
    }
};
