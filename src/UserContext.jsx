import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@src/hooks/useLocalStorage";
import { useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

    // build hooks for a valid login/session
    // const [username, setUsername] = useLocalStorage('username', '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const isLoggedIn = !!username;

    // Tracking posts voted on to only allow one vote per post per user
    const storageKey = username ? `votedPosts_${username}` : 'votedPosts_guest';
    const [votedPosts, setVotedPosts] = useLocalStorage(storageKey, []);

    const recordVote = (postId, type) => {
        setVotedPosts(prev => [...prev, { postId, type }]);
    };

    const removeVote = (postIdToRemove) => {
        setVotedPosts(prev => prev.filter(item => item.postId !== postIdToRemove));
    };

    const getExistingVote = (postIdToCheck) => {
        return votedPosts.find(item => item.postId === postIdToCheck);
    };


    async function createUser(username, password) {
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('username', username);
            console.log(`${username} is now authenticated`);
            setUsername(username);
        } else {
            const body = await response.json();
            alert("Error while trying to create user.")
            console.log(`Error: ${body}`);
        }
    }

    async function loginUser(username, password) {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('username', username);
            console.log(`${username} is now authenticated`);
            setUsername(username);
        } else {
            const body = await response.json();
            alert("Incorrect username or password.")
            console.log(`Error: ${body}`);
        }
    }

    async function logoutUser() {
        fetch('/api/auth/logout', {
            method: 'delete',
        }).catch(() => {

        }).finally(() => {
            localStorage.removeItem('username');
            setUsername('');
        });
    }

    const [theme, setTheme] = useLocalStorage('theme', 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <UserContext.Provider value={{
            username,
            isLoggedIn,
            theme,
            toggleTheme,
            recordVote,
            removeVote,
            getExistingVote,
            votedPosts,
            createUser,
            loginUser,
            logoutUser,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
