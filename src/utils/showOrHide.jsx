import React from 'react';

export function Show({ when, children }) {
	return when ? <>{children}</> : null;
}
