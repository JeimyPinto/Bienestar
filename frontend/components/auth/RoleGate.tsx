import React from "react";
import { useAuthContext } from "../../contexts/authContext";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles?: string[];
    forbiddenRoles?: string[];
    fallback?: React.ReactNode;
}

/**
 * Component to conditionally render children based on user role.
 * 
 * @param allowedRoles - Array of roles that CAN see the content.
 * @param forbiddenRoles - Array of roles that CANNOT see the content.
 * @param fallback - Optional component to show if the user doesn't have permission.
 */
export default function RoleGate({
    children,
    allowedRoles,
    forbiddenRoles,
    fallback = null
}: RoleGateProps) {
    const { user } = useAuthContext();

    if (!user) return fallback as React.ReactElement;

    // If explicit allowedRoles are provided, check if user has one
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return fallback as React.ReactElement;
    }

    // If explicit forbiddenRoles are provided, check if user has one
    if (forbiddenRoles && forbiddenRoles.includes(user.role)) {
        return fallback as React.ReactElement;
    }

    return <>{children}</>;
}
