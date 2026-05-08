<?php

namespace App\Domain\Dashboard\Services;

use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getSummary(int $year): array
    {
        return [
            'totalOrders' => $this->getTotalOrders($year),
            'pendingOrders' => $this->getPendingOrders($year),
            'completedOrders' => $this->getCompletedOrders($year),
            'totalBilling' => $this->getTotalBilling($year),
            'recentOrders' => $this->getRecentOrders($year),
            'recentBilling' => $this->getRecentBilling($year),
        ];
    }

    protected function getTotalOrders(int $year): int
    {
        try {
            return DB::connection('mysql')
                ->table('orders')
                ->whereYear('created_at', $year)
                ->count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    protected function getPendingOrders(int $year): int
    {
        try {
            return DB::connection('mysql')
                ->table('orders')
                ->whereYear('created_at', $year)
                ->where('status', 'pending')
                ->count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    protected function getCompletedOrders(int $year): int
    {
        try {
            return DB::connection('mysql')
                ->table('orders')
                ->whereYear('created_at', $year)
                ->where('status', 'completed')
                ->count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    protected function getTotalBilling(int $year): float
    {
        try {
            $total = DB::connection('mysql')
                ->table('billings')
                ->whereYear('created_at', $year)
                ->sum('amount');
            return (float) ($total ?? 0);
        } catch (\Exception $e) {
            return 0;
        }
    }

    protected function getRecentOrders(int $year): array
    {
        try {
            return DB::connection('mysql')
                ->table('orders')
                ->whereYear('created_at', $year)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }

    protected function getRecentBilling(int $year): array
    {
        try {
            return DB::connection('mysql')
                ->table('billings')
                ->whereYear('created_at', $year)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }
}