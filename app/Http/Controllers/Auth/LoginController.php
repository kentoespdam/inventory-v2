<?php

namespace App\Http\Controllers\Auth;

use App\Domain\Auth\Services\SmartOfficeAuthService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    protected SmartOfficeAuthService $authService;

    public function __construct(SmartOfficeAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function create()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = $this->authService->attempt(
            $credentials['username'],
            $credentials['password']
        );

        if (!$user) {
            return back()->withErrors([
                'username' => 'Username atau password salah.',
            ]);
        }

        Auth::loginUsingId($user['id']);

        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}