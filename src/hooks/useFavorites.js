import { useState, useEffect } from 'react';

export const useFavorites = (storageKey) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error parsing favorites from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to localStorage', error);
        }
    }, [favorites, storageKey]);

    const toggleFavorite = (id) => {
        setFavorites((prev) => 
            prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
        );
    };

    return [favorites, toggleFavorite];
};
