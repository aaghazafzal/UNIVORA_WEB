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

    // Fix inverted buttons
    newContent = newContent.replace(/bg-white text-black/g, 'bg-theme-text text-theme-bg');
    newContent = newContent.replace(/text-black/g, 'text-theme-bg');
    
    // Fix remaining bg-white that aren't bg-white/something
    // Wait, replacing bg-white globally might be dangerous if there are specific use cases.
    // Let's use a regex that matches exactly bg-white (with whitespace around it)
    newContent = newContent.replace(/\bbg-white\b(?![\/])/g, 'bg-theme-text');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");
