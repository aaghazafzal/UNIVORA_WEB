import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // General Backgrounds & Surfaces
    newContent = newContent.replace(/bg-black/g, 'bg-theme-surface');
    newContent = newContent.replace(/bg-\[\#050505\]/g, 'bg-theme-bg');
    newContent = newContent.replace(/bg-[#080808]/g, 'bg-theme-surface-hover');
    
    // Transparent Whites to Surfaces
    newContent = newContent.replace(/bg-white\/5/g, 'bg-theme-surface-hover');
    newContent = newContent.replace(/bg-white\/10/g, 'bg-theme-surface-hover');
    newContent = newContent.replace(/bg-white\/20/g, 'bg-theme-border');
    newContent = newContent.replace(/hover:bg-white\/10/g, 'hover:bg-theme-surface-hover');
    newContent = newContent.replace(/hover:bg-white\/20/g, 'hover:bg-theme-border');
    newContent = newContent.replace(/hover:bg-white\/\[0\.07\]/g, 'hover:bg-theme-surface-hover');
    newContent = newContent.replace(/hover:bg-white\/\[0\.08\]/g, 'hover:bg-theme-surface-hover');
    newContent = newContent.replace(/bg-white\/\[0\.02\]/g, 'bg-theme-surface');
    
    // Text colors
    newContent = newContent.replace(/text-white/g, 'text-theme-text');
    newContent = newContent.replace(/hover:text-white/g, 'hover:text-theme-text');
    newContent = newContent.replace(/text-gray-300/g, 'text-theme-text-muted');
    newContent = newContent.replace(/text-gray-400/g, 'text-theme-text-muted');
    newContent = newContent.replace(/text-gray-500/g, 'text-theme-text-muted');
    newContent = newContent.replace(/text-gray-600/g, 'text-theme-text-muted');
    
    // Primary Color (Orange)
    newContent = newContent.replace(/text-orange-500/g, 'text-theme-primary');
    newContent = newContent.replace(/text-orange-400/g, 'text-theme-primary');
    newContent = newContent.replace(/bg-orange-500/g, 'bg-theme-primary');
    newContent = newContent.replace(/bg-orange-400/g, 'bg-theme-primary');
    newContent = newContent.replace(/hover:text-orange-500/g, 'hover:text-theme-primary');
    newContent = newContent.replace(/hover:bg-orange-500/g, 'hover:bg-theme-primary');
    newContent = newContent.replace(/border-orange-500/g, 'border-theme-primary');
    newContent = newContent.replace(/border-orange-500\/50/g, 'border-theme-primary/50');
    newContent = newContent.replace(/border-orange-500\/30/g, 'border-theme-primary/30');
    newContent = newContent.replace(/bg-orange-500\/10/g, 'bg-theme-primary/10');
    
    // Borders
    newContent = newContent.replace(/border-white\/5/g, 'border-theme-border');
    newContent = newContent.replace(/border-white\/10/g, 'border-theme-border');
    newContent = newContent.replace(/border-white\/20/g, 'border-theme-border-hover');
    newContent = newContent.replace(/hover:border-white\/50/g, 'hover:border-theme-border-hover');
    newContent = newContent.replace(/hover:border-white\/20/g, 'hover:border-theme-border-hover');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");
