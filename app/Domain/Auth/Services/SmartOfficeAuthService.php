<?php

namespace App\Domain\Auth\Services;

use App\Domain\Auth\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;

class SmartOfficeAuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function attempt(string $username, string $password): ?array
    {
        $user = $this->userRepository->findByUsername($username);

        if (!$user) {
            return null;
        }

        $hashedPassword = $user['password'] ?? '';

        $result = DB::connection('mysql_smartoffice')
            ->selectOne('SELECT PASSWORD(?) AS hash', [$password]);

        if ($result && $result->hash === $hashedPassword) {
            return $user;
        }

        return null;
    }

    public function findByUsername(string $username): ?array
    {
        return $this->userRepository->findByUsername($username);
    }

    public function findById(int $id): ?array
    {
        return $this->userRepository->findById($id);
    }
}