import { useForm } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AuthenticatedLayoutProps {
    children: ReactNode;
    user?: {
        name: string;
        username?: string;
    };
    year: number;
}

export default function AuthenticatedLayout({ children, user, year }: AuthenticatedLayoutProps) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i);

    const { post, setData } = useForm({ year: year });

    const changeYear = (newYear: number) => {
        setData('year', newYear);
        post('/set-year', {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">Inventory</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={year}
                                onChange={(e) => changeYear(parseInt(e.target.value))}
                                className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 px-2"
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>

                            <span className="text-sm text-gray-600">
                                {user?.name || 'User'}
                            </span>

                            <form method="POST" action="/logout">
                                <button
                                    type="submit"
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}