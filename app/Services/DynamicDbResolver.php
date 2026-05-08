<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DynamicDbResolver
{
    public function getSikompakConnection(?int $year = null): string
    {
        $year = $year ?? date('Y');
        $connectionName = 'mysql_sikompak_' . $year;

        if (!DB::connection($connectionName)->getDatabaseName()) {
            $connectionName = 'mysql_sikompak';
        }

        return $connectionName;
    }

    public function getSikompakQuery(?int $year = null)
    {
        $connection = $this->getSikompakConnection($year);
        return DB::connection($connection);
    }

    public function getSmartOfficeConnection(): string
    {
        return 'mysql_smartoffice';
    }

    public function getAzizahConnection(): string
    {
        return 'mysql_azizah';
    }

    public function getInventoryConnection(): string
    {
        return 'mysql';
    }

    public function isSikompakYearAvailable(int $year): bool
    {
        try {
            $connection = 'mysql_sikompak_' . $year;
            return Schema::connection($connection)->hasTable('pemakaian');
        } catch (\Exception $e) {
            return false;
        }
    }
}