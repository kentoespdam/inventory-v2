import { Head } from '@inertiajs/react'

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div style={{
                backgroundColor: '#0D0D0D',
                minHeight: '100vh',
                color: '#00FF41',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '32px'
            }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Welcome to Inventory System
                </h1>
                <p style={{ fontSize: '14px', color: '#8B8B8B' }}>
                    TerminalUI Dark Theme Active
                </p>
            </div>
        </>
    )
}