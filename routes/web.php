<?php

use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\SettingController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', HomeController::class)->name('dashboard');

    // Dashboard Routes With Prefixed /dashboard and named as dashboard. to seprate Webiste and Dashboard Logics And routes
    Route::prefix('/dashboard')->name('dashboard.')->group(function () {

        // Posts / Blogs Routes
        Route::resource('/posts', PostController::class);
        Route::delete('/posts-destroy-by-selection', [PostController::class, 'destroyBySelection'])->name('posts.destroybyselection');

        // Google Locaiton AutoCompletion Route  For Posts
        Route::post('/posts-google-location-autocomplete', [PostController::class, 'googleLocationAutoComplete'])->name('posts.google.location.autocomplete');
        Route::post('/posts-google-location-place-details', [PostController::class, 'googleLocationPlaceDetails'])->name('posts.google.location.placedetails');

        // Profile Routes
        Route::controller(ProfileController::class)->group(function () {
            Route::get('/profile', 'index')->name('profile.index');
            Route::put('/profile-update', 'updateProfile')->name('profile.update');
            Route::put('/profile-password-update', 'updatePassword')->name('profile.password.update');
            Route::delete('/profile/account-destroy', 'destroyAccount')->name('profile.account.destroy');
        });

        // Setting Routes
        Route::controller(SettingController::class)->as('settings.')->group(function () {
            Route::get('/settings', 'index')->name('index');

            // Prefixed As /settings On Grouped Routes
            Route::prefix('/settings')->group(function () {
                // General Setting Routess
                Route::get('/general-settings', 'generalSetting')->name('general.setting');
                Route::put('/settings/general-settings-update', 'updateGeneralSetting')->name('general.setting.update');

                // SMTP Setting Routes
                Route::get('/smtp-settings', 'smtpSetting')->name('smtp.setting');
                Route::put('/smtp-settings-update', 'updateSmtpSetting')->name('smtp.setting.update');

                // Role Setting Routes
                Route::get('/roles', 'roleIndex')->name('roles.index');
                Route::get('/roles-create', 'roleCreate')->name('roles.create');
                Route::post('/roles-store', 'roleStore')->name('roles.store');
                Route::get('/roles-edit/{id}', 'roleEdit')->name('roles.edit');
                Route::put('/roles-update/{id}', 'roleUpdate')->name('roles.update');
                Route::delete('/roles-destroy/{id}', 'roleDestroy')->name('roles.destroy');
                Route::delete('/roles-destroy-by-selection', 'destroyRoleBySelection')->name('roles.destroybyselection');
            });

        });
    });
});

require __DIR__.'/auth.php';
