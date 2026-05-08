<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Repositories\OrderRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderService
{
    public function __construct(
        protected OrderRepository $orderRepository
    ) {}

    public function getOrders(int $year, int $perPage = 10, ?string $search = null, ?string $status = null): LengthAwarePaginator
    {
        return $this->orderRepository->paginate($year, $perPage, $search, $status);
    }

    public function getOrderById(int $id): ?array
    {
        return $this->orderRepository->findById($id);
    }

    public function getOrderItems(int $orderId): array
    {
        return $this->orderRepository->getItems($orderId);
    }

    public function getAvailableYears(): array
    {
        return $this->orderRepository->getOrderYears();
    }

    public function formatCurrency(float $amount): string
    {
        return 'Rp ' . number_format($amount, 0, ',', '.');
    }

    public function parseCurrency(string $value): float
    {
        return (float) str_replace(['Rp ', '.'], '', $value);
    }
}