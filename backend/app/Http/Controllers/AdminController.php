<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    function categoryGet(){
        $__category = Category::all();
        return $__category;
    }
    function categoryUpdate(Request $request, $id) {
        try {
            $__category_check = Category::where('category_name' , $request->category_name)->get();
            if (count($__category_check) > 0){
                return response()->json([
                    'status' => 202,
                    'message' => 'error'
                ]);
            }
            $__category = Category::find($id);
            $__category->category_name = $request->category_name;
            $__category->update();
            return response()->json([
                'status' => 200,
                'message' => 'updated'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
        }
    }
    function categoryDelete($id) {
        try {
            $__category = Category::find($id);
            $__category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'deleted'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
        }
    }
    function categoryStore(Request $request) {
        try {
            $__category_check = Category::where('category_name' , $request->category_name)->get();
            if (count($__category_check) > 0){
                return response()->json([
                    'status' => 202,
                    'message' => 'error'
                ]);
            }
            $__category = new Category();
            $__category->category_name = $request->category_name;
            $__category->save();
            return response()->json([
                'status' => 200,
                'message' => 'added'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
        }
    }
    function showImgGallery() {
        $__gallery = Gallery::all();
        return $__gallery;
    }
    function galleryDelete($id) {
        try {
            $__gallery = Gallery::find($id);
            unlink('Images/Gallery/'. $__gallery->image);
            $__gallery->delete();
            return response()->json([
                'status' => 200,
                'message' => 'deleted'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
        }
    }
    function galleryStore(Request $request) {
        $validator = Validator::make($request->all(), [
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
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
            {
                return response()->json([
                    'status' => 203,
                    'message' => 'required'
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
