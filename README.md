<div align="center">
  <img src="https://raw.githubusercontent.com/aaghaz370/UNIVORA_LAST/main/public/logo.png" alt="Univora Logo" width="120" />
  <h1>UNIVORA <span>v2.0</span></h1>
  <p><strong>The Advanced Digital Interface for Managing an Automated Ecosystem.</strong></p>
  <p>
    <a href="https://www.univora.website"><img src="https://img.shields.io/badge/Website-Live-00ffcc?style=for-the-badge&logo=vercel" alt="Website Live" /></a>
    <a href="https://t.me/STREAM_DROP_BOT"><img src="https://img.shields.io/badge/Telegram-Bots_Active-2CA5E0?style=for-the-badge&logo=telegram" alt="Bots Active" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" /></a>
  </p>
</div>

<br />

## 🪐 What is Univora?

**Univora** is a sprawling digital ecosystem built by Rolex Sir. It serves as the central command matrix connecting high-performance Telegram bots, web services, and user interfaces under one unified architecture. 

This repository contains the **Frontend Architecture**—a highly interactive, glassmorphic, and cinematic web interface built with React, Vite, and Tailwind CSS.

---

## ⚡ Key Features

- **Cinematic UI/UX:** Heavy use of Framer Motion for smooth scroll animations, spring physics, and dynamic micro-interactions.
- **Advanced Theming System:** A custom dual-theme (Classic Dark & Matrix Green) engine controlled via CSS variables and a seamless React Context provider.
- **Glassmorphism & Neon Glows:** Complex ambient backgrounds, radial gradients, and frosted glass panels that react to user interactions.
- **Real-Time Ecosystem Dashboard:** Integrated status monitors for Univora's Telegram bots (Stream Drop, Cinemahub, etc.) fetching live metadata.
- **Fully Responsive Matrix:** Perfect pixel execution across all devices, from ultra-wide monitors to mobile screens.

---

## 🛠 Tech Stack

- **Core Framework:** React 18, Vite
- **Styling Engine:** Tailwind CSS, PostCSS
- **Animation Physics:** Framer Motion
- **Icons & Graphics:** Lucide React
- **Routing:** React Router DOM

---

## 🚀 Getting Started

To initialize the Univora Frontend locally on your machine, follow the command sequence below:

### 1. Clone the Repository
```bash
git clone git@github.com-aaghazafzal:aaghazafzal/UNIVORA.git
cd UNIVORA/UNIVORA_FRONTEND
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Initialize Dev Server
```bash
npm run dev
# or
yarn dev
```

The system will boot up and be accessible at `http://localhost:5173`.

---

## 📁 Architecture Overview

```text
src/
├── assets/         # Static global assets (logos, images)
├── components/     # Reusable UI components (Navbar, Footer, GridBackground, SpotLightCard)
├── data/           # Structured mock data & text content for the site
├── pages/          # Main route views (Home, Support, Status, Docs, Apps, Bots)
├── App.jsx         # Core application routing & ThemeProvider wrapper
├── index.css       # Global styles & Tailwind base/components/utilities definitions
└── ThemeContext.js # Global state management for theme toggling
```

---

## 🌐 The Ecosystem

Univora is more than just a website; it is the face of a network of bots and services:

- **Stream Drop Bot**: Secure file sharing & direct streaming platform.
- **Cinemahub Bot**: The ultimate digital library for movies and series.
- **Nexora**: The intelligent conversational AI module.
- **Code X**: Specialized real-time developer assistance.

---

## 🛡️ License & Conduct

Univora operates under strict precision. For details regarding data usage and project guidelines, refer to our [Privacy Protocol](./src/pages/Privacy.jsx) and [Code of Conduct](./src/pages/Conduct.jsx).

<br/>
<div align="center">
  <sub>Built with precision by <strong>Rolex Sir</strong> (aaghazafzal).</sub>
</div>
