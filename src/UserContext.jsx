import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [username, setUsername] = useLocalStorage('username', '');
	const [password, setPassword] = useLocalStorage('password', '');
	const isLoggedIn = !!username;

	const navigate = useNavigate();

	const login = (username, password) => {
		setUsername(username);
		setPassword(password);
		navigate('/trending');

	}

	const logout = () => {
		setUsername('');
		setPassword('');
		navigate('/');
	}

	return (
		<UserContext.Provider value={{ username, isLoggedIn, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
