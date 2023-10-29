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
            $table->string('ketua')->dafault('Ketua')->default('-');
            $table->string('sekretaris')->default('Sekretaris')->default('-');
            $table->string('bendahara')->default('bendahara')->default('-');
            $table->string('perencanaan_dan_program')->default('perencanaan_dan_program')->default('-');
            $table->string('pendidikan_lingkungan_hidup')->default('pendidikan_lingkungan_hidup')->default('-');
            $table->string('pengembangan_usaha')->default('pengembangan_usaha')->default('-');
            $table->string('desa_pasir')->default('desa_pasir')->default('-');
            $table->string('desa_penibung')->default('desa_penibung')->default('-');
            $table->string('desa_sungai_bakau_besar')->default('desa_sungai_bakau_besar')->default('-');
            $table->string('desa_sungai_bakau_kecil')->default('desa_sungai_bakau_kecil')->default('-');
            $table->string('desa_sungai_purun_kecil')->default('desa_sungai_purun_kecil')->default('-');
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
