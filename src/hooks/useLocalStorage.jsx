import React from 'react';
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("LocalStorage Read Error: ", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            setValue(item ? JSON.parse(item) : initialValue);
        } catch (error) {
            console.error("LocalStorage Read Error: ", error);
            setValue(initialValue);
        }

    }, [key]);

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("LocalStorage Write Error: ", error)
        }
    }, [key, value]);

    return [value, setValue];
}
