<?php

namespace App\Domain\Auth\Providers;

use App\Domain\Auth\Services\SmartOfficeAuthService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider as UserProviderContract;
use Illuminate\Foundation\Auth\User;

class SmartOfficeUserProvider implements UserProviderContract
{
    protected SmartOfficeAuthService $authService;

    public function __construct(SmartOfficeAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function retrieveById($identifier): ?Authenticatable
    {
        $userData = $this->authService->findById((int) $identifier);

        if (!$userData) {
            return null;
        }

        return $this->getUserFromData($userData);
    }

    public function retrieveByToken($identifier, $token): ?Authenticatable
    {
        return null;
    }

    public function updateRememberToken(Authenticatable $user, $token): void
    {
    }

    public function retrieveByCredentials(array $credentials): ?Authenticatable
    {
        if (!isset($credentials['username'])) {
            return null;
        }

        $userData = $this->authService->findByUsername($credentials['username']);

        if (!$userData) {
            return null;
        }

        return $this->getUserFromData($userData);
    }

    public function validateCredentials(Authenticatable $user, array $credentials): bool
    {
        $validated = $this->authService->attempt(
            $credentials['username'],
            $credentials['password']
        );

        return $validated !== null;
    }

    public function rehashPasswordIfRequired(Authenticatable $user, array $credentials, bool $force = false): bool
    {
        return false;
    }

    protected function getUserFromData(array $userData): Authenticatable
    {
        return new User([
            'id' => $userData['id'],
            'name' => $userData['name'] ?? $userData['username'] ?? 'User',
            'username' => $userData['username'] ?? null,
            'email' => $userData['email'] ?? null,
            'role' => $userData['role'] ?? null,
        ]);
    }
}