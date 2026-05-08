<?php

namespace App\Domain\Auth\Repositories;

use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function findByUsername(string $username): ?array
    {
        $user = DB::connection('mysql_smartoffice')
            ->table('users')
            ->select('id', 'username', 'name', 'email', 'password', 'role')
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
            ->select('id', 'username', 'name', 'email', 'password', 'role')
            ->where('id', $id)
            ->first();

        if (!$user) {
            return null;
        }

        return (array) $user;
    }

    public function verifyCredentials(string $username, string $password): ?array
    {
        $user = DB::connection('mysql_smartoffice')
            ->table('users')
            ->select('id', 'username', 'name', 'email', 'password', 'role')
            ->where('username', $username)
            ->whereRaw('PASSWORD(?) = password', [$password])
            ->first();

        if (!$user) {
            return null;
        }

        return (array) $user;
    }
}