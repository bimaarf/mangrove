<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Mangrove;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    function mangroveDelete($id_mangrove)
    {
        try {
            $__mangrove = Mangrove::find($id_mangrove);
            $__mangrove->delete();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    function mangroveUpdate(Request $request, $id_mangrove)
    {
        try {
            $__mangrove = Mangrove::find($id_mangrove);
            $__mangrove->label  = $request->label;
            $__mangrove->y      = $request->y;
            $__mangrove->update();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    function mangroveStore(Request $request)
    {
        try {
            $__mangrove = new Mangrove();
            $__mangrove->label = $request->label;
            $__mangrove->y     = $request->y;
            $__mangrove->save();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    function blogGet()
    {
        $__blog         = Blog::join('tb_category', 'tb_category.id', 'tb_blog.category_id')
            ->get(['tb_blog.*', 'tb_category.category_name']);
        return $__blog;
    }
    function blogDelete($id)
    {
        try {
            $__blog = Blog::find($id);
            $__blog->delete();
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
    function blogUpdate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'body' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 202,
                'message' => 'Validator error'
            ]);
        }
        try {
            $__blog                 = Blog::find($id);
            $__blog_check = Blog::where('title', $request->title)
                ->where('title', '!=', $__blog->title)
                ->get();
            if (count($__blog_check) > 0) {
                return response()->json([
                    'status' => 101,
                    'message' => 'title must be unique'
                ]);
            }
            $__blog->title          = $request->title;
            $__blog->slug           = Str::slug($request->title);
            $__blog->body           = $request->body;
            $__blog->category_id    = $request->category_id;
            $__blog->update();
            return response()->json([
                'status' => 200,
                'message' => 'updated'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'Validator error'
            ]);
        }
    }
    function blogStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);

        try {
            $__blog_check = Blog::where('title', $request->title)->get();
            if (count($__blog_check) > 0) {
                return response()->json([
                    'status' => 101,
                    'message' => 'title must be unique'
                ]);
            }
            if ($request->hasFile('image')) {
                $__blog                     = new Blog();
                $__blog->title              = $request->title;
                $__blog->slug               = Str::slug($request->title);
                $__blog->body               = $request->body;
                $__blog->category_id        = $request->category_id;
                foreach ($request->file('image') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $file->move(public_path('Images/Blog'), $filename);
                    $data[] = $filename;
                }
                $__blog->image = json_encode($data);
                $__blog->save();
                return response()->json([
                    'status' => 200,
                    'messages' => 'success',
                ]);
            } else {
                return response()->json([
                    'status' => 203,
                    'messages' => 'image required',
                ]);
            }
        } catch (\Throwable $th) {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error'
                ]);
            }
        }
    }
    function categoryGet()
    {
        $__category = Category::all();
        return $__category;
    }
    function categoryUpdate(Request $request, $id)
    {
        try {
            $__category_check = Category::where('category_name', $request->category_name)->get();
            if (count($__category_check) > 0) {
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
    function categoryDelete($id)
    {
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
    function categoryStore(Request $request)
    {
        try {
            $__category_check = Category::where('category_name', $request->category_name)->get();
            if (count($__category_check) > 0) {
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
    function showImgGallery()
    {
        $__gallery = Gallery::all();
        return $__gallery;
    }
    function galleryDelete($id)
    {
        try {
            $__gallery = Gallery::find($id);
            unlink('Images/Gallery/' . $__gallery->image);
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
    function galleryStore(Request $request)
    {
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
            } {
                return response()->json([
                    'status' => 203,
                    'message' => 'required'
                ]);
            }
        } catch (\Throwable $th) {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error'
                ]);
            }
        }
    }
}
