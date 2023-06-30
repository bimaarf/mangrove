<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Gallery;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    function showGalleryImage() {
        $__gallery = Gallery::all();
        return $__gallery;
    }
    function blogGet(Request $request) {
        if ($request->has('slug'))
        {
            $__blog         = Blog::join('tb_category', 'tb_category.id', 'tb_blog.category_id')
                            ->where('slug', $request->slug)
                            ->first(['tb_blog.*', 'tb_category.category_name']);
            return $__blog;

        }else {
            $__blog         = Blog::join('tb_category', 'tb_category.id', 'tb_blog.category_id')
                            ->get(['tb_blog.*', 'tb_category.category_name']);
            return $__blog;
        }
    }
}
