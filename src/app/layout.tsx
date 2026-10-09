import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import GlobalNav from "../components/GlobalNav";
import "../index.css"; // Preserving global CSS

export const metadata: Metadata = {
  title: "UNIVORA | Ecosystem Command Matrix",
  description: "The Advanced Digital Interface for Managing an Automated Ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 
        The body acts as the single unified canvas background. 
        Theme classes are injected dynamically by the ThemeProvider. 
      */}
      <body className="antialiased transition-colors duration-700 ease-in-out w-full min-h-screen overflow-x-clip flex flex-row">
        <ThemeProvider>
          <GlobalNav />
          <div className="flex-1 min-w-0 pb-24 md:pb-0 relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
