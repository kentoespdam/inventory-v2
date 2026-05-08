<?php

namespace App\Domain\Order\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderRepository
{
    public function paginate(int $year, int $perPage = 10, ?string $search = null, ?string $status = null): LengthAwarePaginator
    {
        $query = DB::connection('mysql')
            ->table('orders')
            ->select('orders.*', 'customers.name as customer_name')
            ->leftJoin('customers', 'orders.id_customer', '=', 'customers.id')
            ->whereYear('orders.created_at', $year);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('orders.no_order', 'like', "%{$search}%")
                  ->orWhere('customers.name', 'like', "%{$search}%")
                  ->orWhere('orders.notes', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('orders.status', $status);
        }

        return $query->orderBy('orders.created_at', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id): ?array
    {
        $order = DB::connection('mysql')
            ->table('orders')
            ->select('orders.*', 'customers.name as customer_name', 'customers.alamat', 'customers.telepon')
            ->leftJoin('customers', 'orders.id_customer', '=', 'customers.id')
            ->where('orders.id', $id)
            ->first();

        return $order ? (array) $order : null;
    }

    public function getItems(int $orderId): array
    {
        return DB::connection('mysql')
            ->table('order_items')
            ->select('order_items.*', 'barang.nama as barang_nama', 'barang.satuan')
            ->leftJoin('barang', 'order_items.id_barang', '=', 'barang.id')
            ->where('order_items.id_order', $orderId)
            ->get()
            ->toArray();
    }

    public function getOrderYears(): array
    {
        $years = DB::connection('mysql')
            ->table('orders')
            ->selectRaw('YEAR(created_at) as year')
            ->groupByRaw('YEAR(created_at)')
            ->orderByRaw('YEAR(created_at) DESC')
            ->pluck('year')
            ->toArray();

        return $years ?: [(int) date('Y')];
    }
}