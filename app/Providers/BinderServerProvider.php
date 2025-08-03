<?php

namespace App\Providers;

use App\Repositories\Settings\Interface\ISettingRepository;
use App\Repositories\Settings\Repository\SettingRepository;
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
