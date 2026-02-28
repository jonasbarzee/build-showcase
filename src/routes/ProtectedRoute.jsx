import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@src/UserContext';

export function ProtectedRoute({ children }) {
	const { isLoggedIn } = useUser();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to='/' replace state={{ from: location }} />;
	}

	return children;
}
