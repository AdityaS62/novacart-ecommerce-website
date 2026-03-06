import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinDate: "January 2024",
    orders: [
        { id: "NC-2024-001", date: "Feb 15, 2024", status: "Delivered", total: 349.98, items: 2 },
        { id: "NC-2024-002", date: "Feb 28, 2024", status: "Shipped", total: 129.99, items: 1 },
        { id: "NC-2024-003", date: "Mar 05, 2024", status: "Processing", total: 89.99, items: 1 },
    ],
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (email, password) => {
        setUser(mockUser);
        setIsLoggedIn(true);
        return true;
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const register = (name, email, password) => {
        setUser({ ...mockUser, name, email });
        setIsLoggedIn(true);
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
