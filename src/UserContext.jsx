import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [username, setUsername] = useLocalStorage('username', '');
	const [password, setPassword] = useLocalStorage('password', '');

	const login = (username, password) => {
		setUsername(username);
		setPassword(password);
	}

	const logout = () => {
		setUsername('');
		setPassword('');
	}

	return (
		<UserContext.Provider value={{ username, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
