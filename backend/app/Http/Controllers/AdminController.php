<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    function galleryStore(Request $request) {
        $validator = Validator::make($request->all(), [
            'image.*' => 'required|image|mimes:jpeg,jpg,png',
        ]);
        try {
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    $__gallery = new Gallery();
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $file->move(public_path('Images/Gallery'), $filename);
                    $__gallery->image = $filename;
                    $__gallery->save();
                }
                return response()->json([
                    'status' => 200,
                    'message' => 'success'
                ]);
            }
        } catch (\Throwable $th) {
            if ($validator->fails())
            {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error'
                ]);
            }
        }
    }
}
