<?php

namespace App\Http\Controllers;

use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class StrukturOrgController extends Controller
{
    // Menampilkan semua data
    public function view()
    {
        $strukturOrganisasi = StrukturOrganisasi::all();
        return response()->json($strukturOrganisasi);
    }


    public function update(Request $request)
    {
        $request->validate([
            'ketua' => 'required',
            'sekretaris' => 'required',
            'bendahara' => 'required',
            'perencanaan_dan_program' => 'required',
            'pendidikan_lingkungan_hidup' => 'required',
            'pengembangan_usaha' => 'required',
            'desa_pasir' => 'required',
            'desa_penibung' => 'required',
            'desa_sungai_bakau_besar' => 'required',
            'desa_sungai_bakau_kecil' => 'required',
            'desa_sungai_purun_kecil' => 'required',
        ]);

        $strukturOrganisasi = StrukturOrganisasi::first();

        if (!$strukturOrganisasi) {
            $strukturOrganisasi = new StrukturOrganisasi;
        }

        $strukturOrganisasi->fill($request->all());

        try {
            $strukturOrganisasi->save();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201, 'error' => $th->getMessage()]);
        }
    }
}
