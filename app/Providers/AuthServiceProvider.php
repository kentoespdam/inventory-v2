<?php

namespace App\Providers;

use App\Domain\Auth\Providers\SmartOfficeUserProvider;
use App\Domain\Auth\Repositories\UserRepository;
use App\Domain\Auth\Services\SmartOfficeAuthService;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(UserRepository::class, function () {
            return new UserRepository();
        });

        $this->app->singleton(SmartOfficeAuthService::class, function ($app) {
            return new SmartOfficeAuthService($app->make(UserRepository::class));
        });

        $this->app->singleton(SmartOfficeUserProvider::class, function ($app) {
            return new SmartOfficeUserProvider($app->make(SmartOfficeAuthService::class));
        });
    }

    public function boot(): void
    {
        auth()->provider('smartoffice', function ($app, array $config) {
            return $app->make(SmartOfficeUserProvider::class);
        });
    }
}