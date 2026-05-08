<?php

namespace App\Domain\Auth\Services;

use App\Domain\Auth\Repositories\UserRepository;

class SmartOfficeAuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function attempt(string $username, string $password): ?array
    {
        return $this->userRepository->verifyCredentials($username, $password);
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