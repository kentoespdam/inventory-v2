<?php

namespace App\Http\Controllers;

use App\Domain\Dashboard\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $year = $request->session()->get('year', (int) date('Y'));

        $summary = $this->dashboardService->getSummary($year);

        return Inertia::render('Dashboard', [
            'year' => $year,
            'summary' => $summary,
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