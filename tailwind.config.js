/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    bg: 'rgb(var(--color-bg) / <alpha-value>)',
                    surface: 'rgb(var(--color-surface) / <alpha-value>)',
                    'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
                    primary: 'rgb(var(--color-primary) / <alpha-value>)',
                    'primary-dim': 'rgb(var(--color-primary-dim) / <alpha-value>)',
                    'primary-glow': 'var(--color-primary-glow)',
                    text: 'rgb(var(--color-text) / <alpha-value>)',
                    'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
                    border: 'rgb(var(--color-border) / <alpha-value>)',
                    'border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)',
                }
            }
        },
    },
    plugins: [],
}
