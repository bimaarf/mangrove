<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    function showGalleryImage() {
        $__gallery = Gallery::all();
        return $__gallery;
    }
}
