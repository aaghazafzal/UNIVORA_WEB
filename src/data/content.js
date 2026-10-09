import { Zap, Shield, Globe, Users, Server, Radio } from 'lucide-react';

export const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Optimized for speed. Access your favorite content instantly without buffering or delays."
    },
    {
        icon: Shield,
        title: "Ad-Free Experience",
        description: "No interruptions. Enjoy movies, music, and books without annoying pop-ups or ads."
    },
    {
        icon: Globe,
        title: "Universal Access",
        description: "Available everywhere. Whether on mobile, tablet, or desktop, Univora adapts to you."
    }
];

export const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Content Served", value: "10TB+", icon: Server },
    { label: "Uptime", value: "99.9%", icon: Radio },
];
