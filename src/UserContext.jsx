import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {

	// build hooks for a valid login/session
	const [username, setUsername] = useLocalStorage('username', '');
	const [password, setPassword] = useLocalStorage('password', '');

	// Tracking posts voted on to only allow one vote per post per user
	const [votedPosts, setVotedPosts] = useLocalStorage('votedPosts', []);

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
	const isLoggedIn = !!username;


	const navigate = useNavigate();

	const login = (username, password) => {
		setUsername(username);
		navigate('/trending');

	};

	const logout = () => {
		setUsername('');
		setVotedPosts([]);
		navigate('/');
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
		}}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
