import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@src/hooks/useLocalStorage";
import { useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

    // build hooks for a valid login/session
    // const [username, setUsername] = useLocalStorage('username', '');
    const [username, setUsername] = useState('');

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

    // !! says that is username is '' then it is still false, username can't be '' to be true
    let isLoggedIn = false;

    // password is still discarded right now just because it is a place holder
    // TODO add password authentication in the database phase

    async function createUser() {
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
            isLoggedIn = true
        } else {
            const body = await response.json();
            console.log(`Error: ${body}`);
        }
    }

    const login = (username) => {
        setUsername(username);
    };

    const logout = () => {
        setUsername('');
        setVotedPosts([]);
    };

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
            login,
            logout,
            theme,
            toggleTheme,
            recordVote,
            removeVote,
            getExistingVote,
            votedPosts,
            createUser,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
