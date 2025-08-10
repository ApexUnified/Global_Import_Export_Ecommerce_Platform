<?php

use App\Http\Controllers\Dashboard\BookmarkController;
use App\Http\Controllers\Dashboard\CollaboratorController;
use App\Http\Controllers\Dashboard\FloorController;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\SettingController;
use App\Http\Controllers\Dashboard\SmartphoneController;
use App\Http\Controllers\Dashboard\SupplierController;
use App\Http\Controllers\Dashboard\UserController;
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

        // Floor Routes
        Route::resource('/floors', FloorController::class)->except(['show']);
        Route::delete('/floors-delete-by-selection', [FloorController::class, 'destroyBySelection'])->name('floors.destroybyselection');

        // Bookmark Routes
        Route::controller(BookmarkController::class)->group(function () {
            Route::get('/bookmarks', 'index')->name('bookmarks.index');
            Route::put('/bookmarks-toggle', 'toggleBookmark')->name('bookmarks.toggle');
            Route::delete('/bookmarks-destroy/{id}', 'destroy')->name('bookmarks.destroy');
            Route::delete('/bookmarks-delete-by-selection', 'destroyBySelection')->name('bookmarks.destroybyselection');

        });

        // User Routes
        Route::resource('/users', UserController::class);
        Route::delete('/users-destroy-by-selection', [UserController::class, 'destroyBySelection'])->name('users.destroybyselection');

        // Supplier Routes
        Route::resource('/suppliers', SupplierController::class);
        Route::delete('/suppliers-destroy-by-selection', [SupplierController::class, 'destroyBySelection'])->name('suppliers.destroybyselection');

        // Collaborator Routes
        Route::resource('/collaborators', CollaboratorController::class);
        Route::delete('/collaborators-destroy-by-selection', [CollaboratorController::class, 'destroyBySelection'])->name('collaborators.destroybyselection');

        // Smart Phone Routes
        Route::resource('/smartphones', SmartphoneController::class);
        Route::delete('/smartphones-destroy-by-selection', [SmartphoneController::class, 'destroyBySelection'])->name('smartphones.destroybyselection');

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

                // Color Routes
                Route::get('/colors', 'colorIndex')->name('colors.index');
                Route::get('/colors-create', 'colorCreate')->name('colors.create');
                Route::post('/colors-store', 'colorStore')->name('colors.store');
                Route::get('/colors-edit/{id}', 'colorEdit')->name('colors.edit');
                Route::put('/colors-update/{id}', 'colorUpdate')->name('colors.update');
                Route::delete('/colors-destroy/{id}', 'colorDestroy')->name('colors.destroy');
                Route::delete('/colors-destroy-by-selection', 'destroyColorBySelection')->name('colors.destroybyselection');
            });

        });
    });
});

require __DIR__.'/auth.php';
