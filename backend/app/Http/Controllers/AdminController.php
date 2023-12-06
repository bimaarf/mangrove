<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Mangrove;
use App\Models\Mitra;
use App\Models\Pengunjung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
class AdminController extends Controller
{
    public function mitraGet()
    {
        $__mitra = Mitra::all();
        return response()->json($__mitra);
    }

    public function mitraStore(Request $request)
    {
        try {
            $_mitra = new Mitra;
            $_mitra->fill($request->all());
            $_mitra->save();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    public function mitraUpdate(Request $request, $id_mitra)
    {
        try {
            $_mitra = Mitra::find($id_mitra);
            $_mitra->fill($request->all());
            $_mitra->update();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    public function mitraDelete($id_mitra)
    {
        try {
            $_mitra = Mitra::find($id_mitra);
            $_mitra->delete();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    public function pengunjungGet()
    {
        $__pengunjung = Pengunjung::all();
        return response()->json($__pengunjung);
    }

    public function pengunjungStore(Request $request)
    {
        try {
            $__pengunjung = new Pengunjung();
            $__pengunjung->fill($request->all());
            $__pengunjung->save();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    public function pengunjungUpdate(Request $request, $id_pengunjung)
    {
        try {
            $__pengunjung = Pengunjung::find($id_pengunjung);
            $__pengunjung->fill($request->all());
            $__pengunjung->update();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
    public function pengunjungDelete($id_pengunjung)
    {
        try {
            $__pengunjung = Pengunjung::find($id_pengunjung);
            $__pengunjung->delete();
            return response()->json(['status' => 200]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 201]);
        }
    }
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
            'image.*' => 'nullable|image|mimes:jpeg,jpg,png,webp',
        ]);

        try {
            $__blog_check = Blog::where('title', $request->title)->get();
            if (count($__blog_check) > 0) {
                return response()->json([
                    'status' => 101,
                    'message' => 'title must be unique'
                ]);
            }
            $__blog                     = new Blog();
            $__blog->title              = $request->title;
            $__blog->slug               = Str::slug($request->title);
            $__blog->body               = $request->body;
            $__blog->category_id        = $request->category_id;
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $file->move(public_path('Images/Blog'), $filename);
                    $data[] = $filename;
                }
                $__blog->image = json_encode($data);
            }
            $__blog->save();
            return response()->json([
                'status' => 200,
                'messages' => 'success',
            ]);
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
    public function galleryStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'status' => 202,
                    'message' => 'Validator error',
                ]);
            }

            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    // Create a new Intervention Image instance
                    $image = Image::make($file);

                    // Resize the image to a maximum of 300 KB
                    $image->resize(1024, 768); // Adjust the dimensions as needed

                    // Get the file size in KB
                    $fileSize = $image->filesize() / 1024;

                    // Check if the image exceeds 300 KB
                    if ($fileSize > 300) {
                        // Save the resized image
                        $filename = time() . '-' . $file->getClientOriginalName();
                        $image->save(public_path('Images/Gallery') . '/' . $filename);

                        // Save the record in the database
                        $gallery = new Gallery();
                        $gallery->image = $filename;
                        $gallery->save();
                    } else {
                        // If the image is already within the size limit, save it as is
                        $filename = time() . '-' . $file->getClientOriginalName();
                        $file->move(public_path('Images/Gallery'), $filename);

                        // Save the record in the database
                        $gallery = new Gallery();
                        $gallery->image = $filename;
                        $gallery->save();
                    }
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'success',
                ]);
            } else {
                return response()->json([
                    'status' => 203,
                    'message' => 'required',
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ]);
        }
    }
}
