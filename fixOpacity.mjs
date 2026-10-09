import fs from 'fs';

// 1. Update tailwind.config.js
let tailwindConfig = `/** @type {import('tailwindcss').Config} */
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
`;
fs.writeFileSync('tailwind.config.js', tailwindConfig, 'utf8');

// Helper to convert hex to rgb triplet
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r} ${g} ${b}`;
}

// 2. Update index.css
let css = fs.readFileSync('./src/index.css', 'utf8');

// Regex to find --color-something: #hex
css = css.replace(/(--color-[a-z-]+):\s*#([0-9a-fA-F]{3,6});/g, (match, p1, p2) => {
    return `${p1}: ${hexToRgb(p2)};`;
});

// Since border colors were rgba(255, 255, 255, 0.1), let's keep them as rgb values without the rgba() so tailwind can add opacity.
// Wait, if border is defined as `var(--color-border)`, and tailwind config is `rgb(var(--color-border) / <alpha-value>)`, 
// then --color-border MUST be just `255 255 255`. 
// The original was `rgba(255, 255, 255, 0.1)`. We can just define it as `255 255 255` and the default opacity will be 1, but we need it to be 0.1 by default?
// Actually, if we define `--color-border: 255 255 255;`, then `border-theme-border` will be solid white. We don't want that. We want it to be 0.1 opacity.
// Let's just hardcode the variables with their proper tailwind RGB values.

const fixedCss = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Common variables */
  --font-main: 'Outfit', sans-serif;
  --font-code: 'JetBrains Mono', monospace;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
}

/* 1. Void Orange (Dark) - Default */
:root, .theme-void-orange {
  --color-bg: 5 5 5;
  --color-surface: 18 18 18;
  --color-surface-hover: 30 30 30;
  --color-primary: 255 107 0;
  --color-primary-dim: 204 85 0;
  --color-primary-glow: rgba(255, 107, 0, 0.5);
  --color-text: 255 255 255;
  --color-text-muted: 160 160 160;
  --color-border: 255 255 255; /* Opacity added via Tailwind */
  --color-border-hover: 255 255 255;
}

/* 2. Midnight Azure (Dark) */
.theme-midnight-azure {
  --color-bg: 10 15 28;
  --color-surface: 19 27 47;
  --color-surface-hover: 28 39 66;
  --color-primary: 59 130 246;
  --color-primary-dim: 37 99 235;
  --color-primary-glow: rgba(59, 130, 246, 0.5);
  --color-text: 248 250 252;
  --color-text-muted: 148 163 184;
  --color-border: 255 255 255;
  --color-border-hover: 255 255 255;
}

/* 3. Cyber Neon (Dark) */
.theme-cyber-neon {
  --color-bg: 9 9 11;
  --color-surface: 24 24 27;
  --color-surface-hover: 39 39 42;
  --color-primary: 34 197 94;
  --color-primary-dim: 22 163 74;
  --color-primary-glow: rgba(34, 197, 94, 0.5);
  --color-text: 255 255 255;
  --color-text-muted: 161 161 170;
  --color-border: 255 255 255;
  --color-border-hover: 255 255 255;
}

/* 4. Stellar Light (Light) */
.theme-stellar-light {
  --color-bg: 255 255 255;
  --color-surface: 244 244 245;
  --color-surface-hover: 228 228 231;
  --color-primary: 255 107 0;
  --color-primary-dim: 234 88 12;
  --color-primary-glow: rgba(255, 107, 0, 0.3);
  --color-text: 9 9 11;
  --color-text-muted: 82 82 91;
  --color-border: 0 0 0;
  --color-border-hover: 0 0 0;
}

/* 5. Frost Minimal (Light) */
.theme-frost-minimal {
  --color-bg: 248 250 252;
  --color-surface: 241 245 249;
  --color-surface-hover: 226 232 240;
  --color-primary: 14 165 233;
  --color-primary-dim: 2 132 199;
  --color-primary-glow: rgba(14, 165, 233, 0.3);
  --color-text: 15 23 42;
  --color-text-muted: 100 116 139;
  --color-border: 0 0 0;
  --color-border-hover: 0 0 0;
}

/* 6. Solar Flare (Light) */
.theme-solar-flare {
  --color-bg: 255 251 235;
  --color-surface: 254 243 199;
  --color-surface-hover: 253 230 138;
  --color-primary: 220 38 38;
  --color-primary-dim: 185 28 28;
  --color-primary-glow: rgba(220, 38, 38, 0.3);
  --color-text: 69 26 3;
  --color-text-muted: 120 53 15;
  --color-border: 0 0 0;
  --color-border-hover: 0 0 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(var(--color-bg));
  color: rgb(var(--color-text));
  font-family: var(--font-main);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.code-font {
  font-family: var(--font-code);
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-family: var(--font-main);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--color-bg));
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--color-primary));
}

/* Hide scrollbar for mobile swipe */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

fs.writeFileSync('./src/index.css', fixedCss, 'utf8');
console.log("Updated index.css and tailwind.config.js for opacity support.");
