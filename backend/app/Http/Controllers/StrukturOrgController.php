<?php

namespace App\Http\Controllers;

use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;

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
        try {
            $strukturOrganisasi = StrukturOrganisasi::first();

            if (!$strukturOrganisasi) {
                $strukturOrganisasi = new StrukturOrganisasi;
            }

            $strukturOrganisasi->fill($request->all());
            $strukturOrganisasi->save();

            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }

}
