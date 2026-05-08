import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface LoginErrors {
    username?: string;
    password?: string;
}

export default function Login({ errors }: { errors?: LoginErrors }) {
    const { data, setData, post, processing } = useForm({
        username: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Inventory System
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                                required
                            />
                            {errors?.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                                required
                            />
                            {errors?.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}