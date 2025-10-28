import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async (authToken) => {
        try {
            localStorage.setItem('authToken', authToken);
            const userData = await api.getUserData();
            setUser(userData);
        } catch (error) {
            console.error("Falha ao buscar dados do usuário:", error);
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [fetchUserData]);

    const login = (newToken) => {
        setToken(newToken);
        setLoading(true);
        fetchUserData(newToken).finally(() => setLoading(false));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    const value = { token, user, login, logout, updateUser, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};