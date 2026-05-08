import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Order {
    id: number;
    no_order: string;
    tgl_order: string;
    customer_name: string;
    status: string;
    total: number;
    notes: string | null;
    created_at: string;
}

interface PageProps {
    auth?: {
        user?: {
            name: string;
            username?: string;
        };
    };
    year: number;
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string | null;
        status: string | null;
        per_page: number;
    };
}

export default function OrderIndex() {
    const { auth, year, orders, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/orders', { search, status }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        router.get('/orders', {}, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        router.get('/orders', { ...filters, page }, { preserveState: true });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-900 text-yellow-300 border-yellow-600',
            approved: 'bg-blue-900 text-blue-300 border-blue-600',
            completed: 'bg-green-900 text-green-300 border-green-600',
            cancelled: 'bg-red-900 text-red-300 border-red-600',
        };
        return styles[status] || 'bg-gray-800 text-gray-300 border-gray-600';
    };

    return (
        <AuthenticatedLayout user={auth?.user} year={year}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Order</h1>
                        <p className="text-gray-600 mt-1">Tahun {year}</p>
                    </div>
                    <a
                        href="/orders/create"
                        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        + Order Baru
                    </a>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={handleSearch} className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="No. Order, Customer, Notes..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-40">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                            >
                                Cari
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Order</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.no_order}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{order.customer_name || '-'}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusBadge(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                                                {formatCurrency(order.total || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{order.notes || '-'}</td>
                                            <td className="px-4 py-3 text-center">
                                                <a
                                                    href={`/orders/${order.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Detail
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            Tidak ada data order
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {orders.last_page > 1 && (
                        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Menampilkan {orders.current_page} dari {orders.last_page} halaman
                            </div>
                            <div className="flex gap-1">
                                {orders.current_page > 1 && (
                                    <button
                                        onClick={() => handlePageChange(orders.current_page - 1)}
                                        className="px-3 py-1 border rounded hover:bg-gray-100"
                                    >
                                        Prev
                                    </button>
                                )}
                                {Array.from({ length: Math.min(5, orders.last_page) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 border rounded ${
                                                page === orders.current_page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                {orders.current_page < orders.last_page && (
                                    <button
                                        onClick={() => handlePageChange(orders.current_page + 1)}
                                        className="px-3 py-1 border rounded hover:bg-gray-100"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}