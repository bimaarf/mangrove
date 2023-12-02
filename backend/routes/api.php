<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\StrukturOrgController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/gallery/get', [SiteController::class, 'showGalleryImage']);
Route::get('/blog/view', [SiteController::class, 'blogGet']);
Route::get('/mangrove/view', [SiteController::class, 'mangroveGet']);
Route::get('/struktur-organisasi/view', [StrukturOrgController::class, 'view']);
Route::get('/mitra-donatur/view', [StrukturOrgController::class, 'view']);
Route::get('/mitra-donatur/view', [AdminController::class, 'mitraGet']);
Route::get('/pengunjung/view', [AdminController::class, 'pengunjungGet']);
Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/struktur-organisasi/update', [StrukturOrgController::class, 'update']);
    Route::post('/mitra-donatur/store', [AdminController::class, 'mitraStore']);
    Route::post('/mitra-donatur/update/{id_mitra}', [AdminController::class, 'mitraUpdate']);
    Route::post('/mitra-donatur/delete/{id_mitra}', [AdminController::class, 'mitraDelete']);
    // --pengunjung
    Route::post('/pengunjung/store', [AdminController::class, 'pengunjungStore']);
    Route::post('/pengunjung/update/{id_pengunjung}', [AdminController::class, 'pengunjungUpdate']);
    Route::post('/pengunjung/delete/{id_pengunjung}', [AdminController::class, 'pengunjungDelete']);
    // --pengunjung
    Route::post('/mangrove/store', [AdminController::class, 'mangroveStore']);
    Route::post('/mangrove/update/{id_mangrove}', [AdminController::class, 'mangroveUpdate']);
    Route::post('/mangrove/delete/{id_mangrove}', [AdminController::class, 'mangroveDelete']);
    Route::get('/gallery/view', [AdminController::class, 'showImgGallery']);
    Route::post('/gallery/store', [AdminController::class, 'galleryStore']);
    Route::post('/gallery/delete/{id}', [AdminController::class, 'galleryDelete']);
    Route::get('/category/view', [AdminController::class, 'categoryGet']);
    Route::post('/category/store', [AdminController::class, 'categoryStore']);
    Route::post('/category/update/{id}', [AdminController::class, 'categoryUpdate']);
    Route::post('/category/delete/{id}', [AdminController::class, 'categoryDelete']);
    Route::get('/blog/view', [AdminController::class, 'blogGet']);
    Route::post('/blog/update/{id}', [AdminController::class, 'blogUpdate']);
    Route::post('/blog/delete/{id}', [AdminController::class, 'blogDelete']);
    Route::post('/blog/store', [AdminController::class, 'blogStore']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
