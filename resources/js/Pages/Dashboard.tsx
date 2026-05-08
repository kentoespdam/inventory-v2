import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface DashboardProps {
    year: number;
    auth?: {
        user?: {
            name: string;
            username?: string;
        };
    };
}

export default function Dashboard({ year, auth }: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth?.user} year={year}>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the inventory system!</p>
        </AuthenticatedLayout>
    );
}