/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00FF41',
                secondary: '#FF6600',
                tertiary: '#00BFFF',
                background: '#0D0D0D',
                surface: '#141414',
                error: '#FF0040',
                success: '#00FF41',
                warning: '#FF6600',
                info: '#00BFFF',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                'none': '0px',
            },
        },
    },
    plugins: [],
}