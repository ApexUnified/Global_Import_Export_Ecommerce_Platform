<?php

use App\Http\Controllers\Dashboard\BatchController;
use App\Http\Controllers\Dashboard\BookmarkController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\CollaboratorController;
use App\Http\Controllers\Dashboard\Commissions\CollaboratorCommissionController;
use App\Http\Controllers\Dashboard\Commissions\DistributorCommissionController;
use App\Http\Controllers\Dashboard\Commissions\SupplierCommissionController;
use App\Http\Controllers\Dashboard\CustomerController;
use App\Http\Controllers\Dashboard\DistributorController;
use App\Http\Controllers\Dashboard\FloorController;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\InventoryController;
use App\Http\Controllers\Dashboard\OrderController;
use App\Http\Controllers\Dashboard\PackageRecordingController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\RewardPointController;
use App\Http\Controllers\Dashboard\SettingController;
use App\Http\Controllers\Dashboard\SmartphoneController;
use App\Http\Controllers\Dashboard\SmartphoneForSaleController;
use App\Http\Controllers\Dashboard\SupplierController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', HomeController::class)->name('dashboard');

    // Dashboard Routes With Prefixed /dashboard and named as dashboard. to seprate Webiste and Dashboard Logics And routes
    Route::prefix('/dashboard')->name('dashboard.')->group(function () {

        // Posts / Blogs Routes
        Route::controller(PostController::class)->name('posts.')->group(function () {
            Route::get('/posts', 'index')->name('index');
            Route::get('/posts/create', 'create')->name('create');
            Route::post('/posts-store', 'store')->name('store');
            Route::get('/posts-edit/{slug?}', 'edit')->name('edit');
            Route::put('/posts-update/{slug?}', 'update')->name('update');
            Route::get('/post-view/{slug?}', 'show')->name('show');
            Route::delete('/posts-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/posts-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');

            // Google Locaiton AutoCompletion Route  For Posts
            Route::post('/posts-google-location-autocomplete', 'googleLocationAutoComplete')->name('google.location.autocomplete');
            Route::post('/posts-google-location-place-details', 'googleLocationPlaceDetails')->name('google.location.placedetails');
        });

        // Floor Routes
        Route::controller(FloorController::class)->name('floors.')->group(function () {

            Route::get('/floors', 'index')->name('index');
            Route::get('/floors-create', 'create')->name('create');
            Route::post('/floors-store', 'store')->name('store');
            Route::get('/floors-edit/{id?}', 'edit')->name('edit');
            Route::put('/floors-update/{id?}', 'update')->name('update');
            Route::delete('/floors-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/floors-delete-by-selection', 'destroyBySelection')->name('destroybyselection');

        });

        // Bookmark Routes
        Route::controller(BookmarkController::class)->name('bookmarks.')->group(function () {
            Route::get('/bookmarks', 'index')->name('index');
            Route::put('/bookmarks-toggle', 'toggleBookmark')->name('toggle');
            Route::delete('/bookmarks-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/bookmarks-delete-by-selection', 'destroyBySelection')->name('destroybyselection');

        });

        // User Routes
        Route::controller(UserController::class)->name('users.')->group(function () {
            Route::get('/users', 'index')->name('index');
            Route::get('/users-create', 'create')->name('create');
            Route::post('/users-store', 'store')->name('store');
            Route::get('/users-edit/{id?}', 'edit')->name('edit');
            Route::put('/users-update/{id?}', 'update')->name('update');
            Route::get('/users-view/{id?}', 'show')->name('show');
            Route::delete('/users-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/users-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Supplier Routes
        Route::controller(SupplierController::class)->name('suppliers.')->group(function () {

            Route::get('/suppliers', 'index')->name('index');
            Route::get('/suppliers-create', 'create')->name('create');
            Route::post('/suppliers-store', 'store')->name('store');
            Route::get('/suppliers-edit/{id?}', 'edit')->name('edit');
            Route::put('/suppliers-update/{id?}', 'update')->name('update');
            Route::get('/suppliers-view/{id?}', 'show')->name('show');
            Route::delete('/suppliers-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/suppliers-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Collaborator Routes
        Route::controller(CollaboratorController::class)->name('collaborators.')->group(function () {

            Route::get('/collaborators', 'index')->name('index');
            Route::get('/collaborators-create', 'create')->name('create');
            Route::post('/collaborators-store', 'store')->name('store');
            Route::get('/collaborators-edit/{id?}', 'edit')->name('edit');
            Route::put('/collaborators-update/{id?}', 'update')->name('update');
            Route::get('/collaborators-view/{id?}', 'show')->name('show');
            Route::delete('/collaborators-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/collaborators-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Distributor Routes

        Route::controller(DistributorController::class)->name('distributors.')->group(function () {

            Route::get('/distributors', 'index')->name('index');
            Route::get('/distributors-create', 'create')->name('create');
            Route::post('/distributors-store', 'store')->name('store');
            Route::get('/distributors-edit/{id?}', 'edit')->name('edit');
            Route::put('/distributors-update/{id?}', 'update')->name('update');
            Route::get('/distributors-view/{id?}', 'show')->name('show');
            Route::delete('/distributors-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/distributors-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Customer Routes
        Route::controller(CustomerController::class)->name('customers.')->group(function () {

            Route::get('/customers', 'index')->name('index');
            Route::get('/customers-create', 'create')->name('create');
            Route::post('/customers-store', 'store')->name('store');
            Route::get('/customers-edit/{id?}', 'edit')->name('edit');
            Route::put('/customers-update/{id?}', 'update')->name('update');
            Route::get('/customers-view/{id?}', 'show')->name('show');
            Route::delete('/customers-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/customers-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Smart Phone Routes
        Route::controller(SmartphoneController::class)->name('smartphones.')->group(function () {

            Route::get('/smartphones', 'index')->name('index');
            Route::get('/smartphones-create', 'create')->name('create');
            Route::post('/smartphones-store', 'store')->name('store');
            Route::get('/smartphones-edit/{id?}', 'edit')->name('edit');
            Route::put('/smartphones-update/{id?}', 'update')->name('update');
            Route::get('/smartphones-view/{id?}', 'show')->name('show');
            Route::delete('/smartphones-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/smartphones-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Batch Routes
        Route::controller(BatchController::class)->name('batches.')->group(function () {

            Route::get('/batches', 'index')->name('index');
            Route::get('/batches-create', 'create')->name('create');
            Route::post('/batches-store', 'store')->name('store');
            Route::get('/batches-edit/{id?}', 'edit')->name('edit');
            Route::put('/batches-update/{id?}', 'update')->name('update');
            Route::delete('/batches-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/batches-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');

        });

        // Inventory Routes
        Route::controller(InventoryController::class)->name('inventories.')->group(function () {

            Route::get('/inventories', 'index')->name('index');
            Route::get('/inventories-edit/{id?}', 'edit')->name('edit');
            Route::put('/inventories-update/{id?}', 'update')->name('update');
            Route::delete('/inventories-destroy/{id?}', 'destroy')->name('destroy');
            Route::get('/inventories-get-smart-phone-by-upc/{upc}', 'getSmartPhoneByUpc')->name('getsmartphonebyupc');
            Route::delete('/inventories-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Order Routes
        Route::controller(OrderController::class)->name('orders.')->group(function () {

            Route::get('/orders', 'index')->name('index');
            Route::get('/orders-create', 'create')->name('create');
            Route::post('/orders-store', 'store')->name('store');
            Route::get('/orders-edit/{id?}', 'edit')->name('edit');
            Route::put('/orders-update/{id?}', 'update')->name('update');
            Route::get('/orders-view/{id?}', 'show')->name('show');
            Route::post('/order-package-recordings-store', 'packageRecordingStore')->name('packagerecordingstore');
            Route::delete('/orders-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/orders-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
            Route::put('/orders-update-cash-collected-status/{id?}', 'updateCashCollectedStatus')->name('updatecashcollectedstatus');
        });

        // Package Recording Routes
        Route::controller(PackageRecordingController::class)->name('package-recordings.')->group(function () {

            Route::get('/package-recordings', 'index')->name('index');
            Route::get('/package-recordings-create', 'create')->name('create');
            Route::post('/package-recordings-store', 'store')->name('store');
            // Route::get('/package-recordings-edit/{id?}', 'edit')->name('edit');
            // Route::put('/package-recordings-update/{id?}', 'update')->name('update');
            Route::delete('/package-recordings-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/package-recordings-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Smartphone For Sale Routes
        Route::controller(SmartphoneForSaleController::class)->name('smartphone-for-sales.')->group(function () {

            Route::get('/smartphone-for-sales', 'index')->name('index');
            Route::get('/smartphone-for-sales-create', 'create')->name('create');
            Route::post('/smartphone-for-sales-store', 'store')->name('store');
            Route::get('/smartphone-for-sales-edit/{id?}', 'edit')->name('edit');
            Route::put('/smartphone-for-sales-update/{id?}', 'update')->name('update');
            Route::delete('/smartphone-for-sales-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/smartphone-for-sales-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Category Routes
        Route::controller(CategoryController::class)->name('categories.')->group(function () {

            Route::get('/categories', 'index')->name('index');
            Route::get('/categories-create', 'create')->name('create');
            Route::post('/categories-store', 'store')->name('store');
            Route::get('/categories-edit/{id?}', 'edit')->name('edit');
            Route::put('/categories-update/{id?}', 'update')->name('update');
            Route::get('/categories-view/{id?}', 'show')->name('show');
            Route::delete('/categories-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/categories-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Reward Point Routes
        Route::controller(RewardPointController::class)->name('reward-points.')->group(function () {

            Route::get('/reward-points', 'index')->name('index');
            Route::get('/reward-points-create', 'create')->name('create');
            Route::post('/reward-points-store', 'store')->name('store');
            Route::get('/reward-points-edit/{id?}', 'edit')->name('edit');
            Route::put('/reward-points-update/{id?}', 'update')->name('update');
            Route::delete('/reward-points-destroy/{id?}', 'destroy')->name('destroy');
            Route::delete('/reward-points-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
        });

        // Commision Routes Group
        Route::prefix('/commissions')->name('commissions.')->group(function () {

            // Supplier Commission Route Group
            Route::controller(SupplierCommissionController::class)->name('supplier-commissions.')->group(function () {
                Route::get('/supplier-commissions', 'index')->name('index');
                Route::get('/supplier-commissions/{id?}', 'edit')->name('edit');
                Route::put('/supplier-commissions/{id?}', 'update')->name('update');
                Route::delete('/supplier-commissions/{id?}', 'destroy')->name('destroy');
                Route::delete('/supplier-commissions-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
            });

            // Collaborator Commission Route Group
            Route::controller(CollaboratorCommissionController::class)->name('collaborator-commissions.')->group(function () {
                Route::get('/collaborator-commissions', 'index')->name('index');
                Route::get('/collaborator-commissions/{id?}', 'edit')->name('edit');
                Route::put('/collaborator-commissions/{id?}', 'update')->name('update');
                Route::delete('/collaborator-commissions/{id?}', 'destroy')->name('destroy');
                Route::delete('/collaborator-commissions-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
            });

            // Distributor Commission Route Group
            Route::controller(DistributorCommissionController::class)->name('distributor-commissions.')->group(function () {
                Route::get('/distributor-commissions', 'index')->name('index');
                Route::get('/distributor-commissions/{id?}', 'edit')->name('edit');
                Route::put('/distributor-commissions/{id?}', 'update')->name('update');
                Route::delete('/distributor-commissions/{id?}', 'destroy')->name('destroy');
                Route::delete('/distributor-commissions-destroy-by-selection', 'destroyBySelection')->name('destroybyselection');
            });
        });

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
                Route::get('/roles-edit/{id?}', 'roleEdit')->name('roles.edit');
                Route::put('/roles-update/{id?}', 'roleUpdate')->name('roles.update');
                Route::delete('/roles-destroy/{id?}', 'roleDestroy')->name('roles.destroy');
                Route::delete('/roles-destroy-by-selection', 'destroyRoleBySelection')->name('roles.destroybyselection');

                // Color Routes
                Route::get('/colors', 'colorIndex')->name('colors.index');
                Route::get('/colors-create', 'colorCreate')->name('colors.create');
                Route::post('/colors-store', 'colorStore')->name('colors.store');
                Route::get('/colors-edit/{id?}', 'colorEdit')->name('colors.edit');
                Route::put('/colors-update/{id?}', 'colorUpdate')->name('colors.update');
                Route::delete('/colors-destroy/{id?}', 'colorDestroy')->name('colors.destroy');
                Route::delete('/colors-destroy-by-selection', 'destroyColorBySelection')->name('colors.destroybyselection');

                // Model Name Routes
                Route::get('/model-names', 'modelNameIndex')->name('model_names.index');
                Route::get('/model-names-create', 'modelNameCreate')->name('model_names.create');
                Route::post('/model-names-store', 'modelNameStore')->name('model_names.store');
                Route::get('/model-names-edit/{id?}', 'modelNameEdit')->name('model_names.edit');
                Route::put('/model-names-update/{id?}', 'modelNameUpdate')->name('model_names.update');
                Route::delete('/model-names-destroy/{id?}', 'modelNameDestroy')->name('model_names.destroy');
                Route::delete('/model-names-destroy-by-selection', 'destroyModelNameBySelection')->name('model_names.destroybyselection');

                // Capcaity Routes
                Route::get('/capacities', 'capacityIndex')->name('capacities.index');
                Route::get('/capacities-create', 'capacityCreate')->name('capacities.create');
                Route::post('/capacities-store', 'capacityStore')->name('capacities.store');
                Route::get('/capacities-edit/{id?}', 'capacityEdit')->name('capacities.edit');
                Route::put('/capacities-update/{id?}', 'capacityUpdate')->name('capacities.update');
                Route::delete('/capacities-destroy/{id?}', 'capacityDestroy')->name('capacities.destroy');
                Route::delete('/capacities-destroy-by-selection', 'destroyCapacityBySelection')->name('capacities.destroybyselection');

                // Storage Location Routes
                Route::get('/storage-locations', 'storageLocationIndex')->name('storage_locations.index');
                Route::get('/storage-locations-create', 'storageLocationCreate')->name('storage_locations.create');
                Route::post('/storage-locations-store', 'storageLocationStore')->name('storage_locations.store');
                Route::get('/storage-locations-edit/{id?}', 'storageLocationEdit')->name('storage_locations.edit');
                Route::put('/storage-locations-update/{id?}', 'storageLocationUpdate')->name('storage_locations.update');
                Route::delete('/storage-locations-destroy/{id?}', 'storageLocationDestroy')->name('storage_locations.destroy');
                Route::delete('/storage-locations-destroy-by-selection', 'destroyStorageLocationBySelection')->name('storage_locations.destroybyselection');

                // Currency Routes
                Route::get('/currencies', 'currencyIndex')->name('currencies.index');
                Route::get('/currencies-create', 'currencyCreate')->name('currencies.create');
                Route::post('/currencies-store', 'currencyStore')->name('currencies.store');
                Route::get('/currencies-edit/{id?}', 'currencyEdit')->name('currencies.edit');
                Route::put('/currencies-update/{id?}', 'currencyUpdate')->name('currencies.update');
                Route::put('/currencies-toggle/{id?}', 'toggleCurrencyStatus')->name('currencies.toggle');
                Route::delete('/currencies-destroy/{id?}', 'currencyDestroy')->name('currencies.destroy');
                Route::delete('/currencies-destroy-by-selection', 'destroycurrencyBySelection')->name('currencies.destroybyselection');

                // Additional Fee List Routes
                Route::get('/additional-fee-lists', 'additionalFeeListIndex')->name('additional_fee_lists.index');
                Route::get('/additional-fee-lists-create', 'additionalFeeListCreate')->name('additional_fee_lists.create');
                Route::post('/additional-fee-lists-store', 'additionalFeeListStore')->name('additional_fee_lists.store');
                Route::get('/additional-fee-lists-edit/{id?}', 'additionalFeeListEdit')->name('additional_fee_lists.edit');
                Route::put('/additional-fee-lists-update/{id?}', 'additionalFeeListUpdate')->name('additional_fee_lists.update');
                Route::put('/additional-fee-lists-toggle/{id?}', 'toggleAdditionalFeeListStatus')->name('additional_fee_lists.toggle');
                Route::delete('/additional-fee-lists-destroy/{id?}', 'additionalFeeListDestroy')->name('additional_fee_lists.destroy');
                Route::delete('/additional-fee-lists-destroy-by-selection', 'destroyAdditionalFeeListBySelection')->name('additional_fee_lists.destroybyselection');

                // Reward Setting Routes
                Route::get('/reward-point-setting', 'rewardPointSettingIndex')->name('reward-point-setting.index');
                Route::put('/reward-point-setting-update', 'rewardPointSettingUpdate')->name('reward-point-setting.update');

                // Commission Setting Routes
                Route::get('/commission-settings', 'commissionSettingIndex')->name('commission-settings.index');
                Route::get('/commission-settings-create', 'commissionSettingCreate')->name('commission-settings.create');
                Route::post('/commission-settings-store', 'commissionSettingStore')->name('commission-settings.store');
                Route::get('/commission-settings-edit/{id?}', 'commissionSettingEdit')->name('commission-settings.edit');
                Route::put('/commission-settings-update/{id?}', 'commissionSettingUpdate')->name('commission-settings.update');
                Route::delete('/commission-settings-destroy/{id?}', 'destroyCommissionSetting')->name('commission-settings.destroy');
                Route::delete('/commission-settings-destroy-by-selection', 'destroyCommissionSettingBySelection')->name('commission-settings.destroybyselection');
            });

        });
    });

    // Order Invoice Routes
    Route::controller(OrderController::class)->name('orders.')->group(function () {
        // Customer Order Invoice
        Route::get('/orders-customer-order-invoice/{order_no?}', 'customerOrderInvoice')->name('customer-order-invoice');

        // Shipping Invoice
        Route::get('/orders-shipping-invoice/{order_no?}', 'shippingInvoice')->name('shipping-invoice');
    });

});

require __DIR__.'/auth.php';
