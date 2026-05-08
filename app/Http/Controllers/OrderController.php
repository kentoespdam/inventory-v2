<?php

namespace App\Http\Controllers;

use App\Domain\Order\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService
    ) {}

    public function index(Request $request)
    {
        $year = $request->session()->get('year', (int) date('Y'));
        $search = $request->input('search');
        $status = $request->input('status');
        $perPage = $request->input('per_page', 10);

        $orders = $this->orderService->getOrders($year, $perPage, $search, $status);

        return Inertia::render('Order/Index', [
            'auth' => ['user' => $request->user() ? [
                'name' => $request->user()->name,
                'username' => $request->user()->username ?? null,
            ] : null],
            'year' => $year,
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'per_page' => $perPage,
            ],
        ]);
    }
}