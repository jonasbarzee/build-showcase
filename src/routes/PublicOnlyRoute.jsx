import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@src/UserContext";

export function PublicOnlyRoute({ children }) {
	const { isLoggedIn } = useUser();

	return isLoggedIn ? <Navigate to="/trending" replace /> : children;
}
