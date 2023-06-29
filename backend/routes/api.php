<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\SiteController;
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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/admin/gallery/view', [AdminController::class, 'showImgGallery']);
    Route::post('/admin/gallery/store', [AdminController::class, 'galleryStore']);
    Route::post('/admin/gallery/delete/{id}', [AdminController::class, 'galleryDelete']);
    Route::get('/admin/category/view', [AdminController::class, 'categoryGet']);
    Route::post('/admin/category/store', [AdminController::class, 'categoryStore']);
    Route::post('/admin/category/update/{id}', [AdminController::class, 'categoryUpdate']);
    Route::post('/admin/category/delete/{id}', [AdminController::class, 'categoryDelete']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
