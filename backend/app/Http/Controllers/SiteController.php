<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Gallery;
use App\Models\Mangrove;
use App\Models\Pengunjung;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function showGalleryImage()
    {
        $__gallery = Gallery::all();
        return $__gallery;
    }
    public function blogGet(Request $request)
    {
        if ($request->has('slug')) {
            $__blog         = Blog::join('tb_category', 'tb_category.id', 'tb_blog.category_id')
                ->where('slug', $request->slug)
                ->first(['tb_blog.*', 'tb_category.category_name']);
            return $__blog;
        } else {
            $__blog         = Blog::join('tb_category', 'tb_category.id', 'tb_blog.category_id')
                ->get(['tb_blog.*', 'tb_category.category_name']);
            return $__blog;
        }
    }
    // public function pengunjungChart()
    // {
    //     $mangroveData = Pengunjung::all();
    //     $chartData = [];
    
    //     foreach ($mangroveData as $item) {
    //         $tahun = $item->tahun;
    //         $index = array_search($tahun, array_column($chartData, 'label'));
    
    //         if ($index !== false) {
    //             $chartData[$index]['y'] += (int) 1;
    //         } else {
    //             array_push($chartData, [
    //                 'label' => $tahun,
    //                 'y' => (int) 1,
    //             ]);
    //         }
    //     }
    
    //     usort($chartData, function ($a, $b) {
    //         return $a['label'] - $b['label'];
    //     });
    //     return response()->json($chartData);
    // }
    
    public function pengunjungChart()
    {
        $mangroveData = Pengunjung::all();

        // Convert "y" values to integers
        $data = array();
        foreach ($mangroveData as $item) {
            array_push($data, [
                'id' => $item->id,
                'label' => $item->nama_kegiatan,
                'y' => (int)$item->jumlah_orang,

            ]);
        }

        return response()->json($data);
    }
    public function mangroveGet()
    {
        $mangroveData = Mangrove::all();

        // Convert "y" values to integers
        $data = array();
        foreach ($mangroveData as $item) {
            array_push($data, [
                'id' => $item->id,
                'label' => $item->tempat,
                'tahun' => $item->tahun,
                'y' => (int)$item->jumlah_mangrove,

            ]);
        }

        return response()->json($data);
    }
}
