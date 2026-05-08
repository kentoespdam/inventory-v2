<?php

namespace App\Domain\Auth\Repositories;

use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function findByUsername(string $username): ?array
    {
        $user = DB::connection('mysql_smartoffice')
            ->table('users')
            ->where('username', $username)
            ->first();

        if (!$user) {
            return null;
        }

        return (array) $user;
    }

    public function findById(int $id): ?array
    {
        $user = DB::connection('mysql_smartoffice')
            ->table('users')
            ->where('id', $id)
            ->first();

        if (!$user) {
            return null;
        }

        return (array) $user;
    }
}