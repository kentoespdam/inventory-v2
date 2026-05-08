<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->session()->get('year', (int) date('Y'));

        return Inertia::render('Dashboard', [
            'year' => $year,
        ]);
    }

    public function setYear(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2020|max:2030',
        ]);

        $request->session()->put('year', $request->input('year'));

        return response()->json(['success' => true, 'year' => $request->input('year')]);
    }
}