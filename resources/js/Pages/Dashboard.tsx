import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface DashboardProps {
    year: number;
    auth?: {
        user?: {
            name: string;
            username?: string;
        };
    };
    summary?: {
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        totalBilling: number;
        recentOrders: any[];
        recentBilling: any[];
    };
}

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
    return (
        <div className={`p-6 rounded-lg shadow ${color}`}>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
    );
}

export default function Dashboard({ year, auth, summary }: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout user={auth?.user} year={year}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard {year}</h1>
                    <p className="text-gray-600 mt-1">Ringkasan data inventory</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Order" value={summary?.totalOrders ?? 0} color="bg-white" />
                    <StatCard title="Order Pending" value={summary?.pendingOrders ?? 0} color="bg-yellow-50" />
                    <StatCard title="Order Completed" value={summary?.completedOrders ?? 0} color="bg-green-50" />
                    <StatCard title="Total Billing" value={formatCurrency(summary?.totalBilling ?? 0)} color="bg-blue-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Terbaru</h2>
                        {summary?.recentOrders && summary.recentOrders.length > 0 ? (
                            <ul className="space-y-3">
                                {summary.recentOrders.map((order: any, index: number) => (
                                    <li key={index} className="flex justify-between items-center border-b pb-2">
                                        <span className="text-gray-700">Order #{order.id}</span>
                                        <span className={`text-sm px-2 py-1 rounded ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Belum ada order</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Terbaru</h2>
                        {summary?.recentBilling && summary.recentBilling.length > 0 ? (
                            <ul className="space-y-3">
                                {summary.recentBilling.map((billing: any, index: number) => (
                                    <li key={index} className="flex justify-between items-center border-b pb-2">
                                        <span className="text-gray-700">Billing #{billing.id}</span>
                                        <span className="text-gray-900 font-medium">{formatCurrency(billing.amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Belum ada billing</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}