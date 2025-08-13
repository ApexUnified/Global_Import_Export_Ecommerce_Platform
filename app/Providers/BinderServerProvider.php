<?php

namespace App\Providers;

use App\Repositories\Batches\Interface\IBatchRepository;
use App\Repositories\Batches\Repository\BatchRepository;
use App\Repositories\Bookmarks\Interface\IBookmarkRepository;
use App\Repositories\Bookmarks\Repository\BookmarkRepository;
use App\Repositories\Collaborators\Interface\ICollaboratorRepository;
use App\Repositories\Collaborators\Repository\CollaboratorRepository;
use App\Repositories\Floors\Interface\IFloorRepostitory;
use App\Repositories\Floors\Repository\FloorRepostitory;
use App\Repositories\Inventories\Interface\IInventoryRepository;
use App\Repositories\Inventories\Repository\InventoryRepository;
use App\Repositories\Posts\Interface\IPostRepository;
use App\Repositories\Posts\Repository\PostRepository;
use App\Repositories\Settings\Interface\ISettingRepository;
use App\Repositories\Settings\Repository\SettingRepository;
use App\Repositories\Smartphones\Interface\ISmartphoneRepository;
use App\Repositories\Smartphones\Repository\SmartphoneRepository;
use App\Repositories\Suppliers\Interface\ISupplierRepository;
use App\Repositories\Suppliers\Repository\SupplierRepository;
use App\Repositories\Users\Interface\IUserRepository;
use App\Repositories\Users\Repository\UserRepository;
use Illuminate\Support\ServiceProvider;

class BinderServerProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(ISettingRepository::class, SettingRepository::class);
        $this->app->bind(IPostRepository::class, PostRepository::class);
        $this->app->bind(IFloorRepostitory::class, FloorRepostitory::class);
        $this->app->bind(IBookmarkRepository::class, BookmarkRepository::class);
        $this->app->bind(ISupplierRepository::class, SupplierRepository::class);
        $this->app->bind(ICollaboratorRepository::class, CollaboratorRepository::class);
        $this->app->bind(ISmartphoneRepository::class, SmartphoneRepository::class);
        $this->app->bind(IBatchRepository::class, BatchRepository::class);
        $this->app->bind(IInventoryRepository::class, InventoryRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
