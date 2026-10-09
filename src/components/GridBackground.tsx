import React from 'react';

// Highly optimized, static grid background without expensive blend modes and infinite react loops.
export default function GridBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-theme-bg">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            
            {/* Subtle Static Center Orb (No animation to preserve 60FPS) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[1000px] max-h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-theme-primary/10 via-transparent to-transparent rounded-[100%] opacity-80 pointer-events-none" />
            
            {/* Edge fading to blend grid smoothly */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-theme-bg" />
        </div>
    );
}
