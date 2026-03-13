import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@src/UserContext';
import { useEffect } from 'react';

export function ProtectedRoute({ children }) {
    const { isLoggedIn } = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate])

    return children;
}
