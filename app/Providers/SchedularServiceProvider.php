<?php

namespace App\Providers;

use App\Console\Commands\CheckRewardPointExpiry;
use App\Console\Commands\ClearPreviousOrderPackageRecordings;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;

class SchedularServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(Schedule $schedule): void
    {
        $schedule->command(CheckRewardPointExpiry::class)->daily();
        $schedule->command(ClearPreviousOrderPackageRecordings::class)->daily();
    }
}
