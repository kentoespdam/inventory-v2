<?php

namespace App\Providers;

use App\Services\DynamicDbResolver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(DynamicDbResolver::class, function () {
            return new DynamicDbResolver();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDynamicSikompakConnections();
    }

    protected function configureDynamicSikompakConnections(): void
    {
        $currentYear = (int) date('Y');
        $config = config('database');

        for ($year = $currentYear - 2; $year <= $currentYear; $year++) {
            $connectionName = 'mysql_sikompak_' . $year;

            if (!isset($config['connections'][$connectionName])) {
                $config['connections'][$connectionName] = [
                    'driver' => 'mysql',
                    'url' => env('DB_SIKOMPAK_URL'),
                    'host' => env('DB_SIKOMPAK_HOST', '127.0.0.1'),
                    'port' => env('DB_SIKOMPAK_PORT', '3306'),
                    'database' => 'sikompak' . $year,
                    'username' => env('DB_SIKOMPAK_USERNAME', 'root'),
                    'password' => env('DB_SIKOMPAK_PASSWORD', ''),
                    'charset' => env('DB_SIKOMPAK_CHARSET', 'utf8mb4'),
                    'collation' => env('DB_SIKOMPAK_COLLATION', 'utf8mb4_unicode_ci'),
                    'prefix' => '',
                    'prefix_indexes' => true,
                    'strict' => true,
                    'engine' => null,
                ];
            }
        }

        config(['database.connections' => $config['connections']]);
    }
}
