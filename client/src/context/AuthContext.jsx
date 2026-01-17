import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get(`${API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (error) {
                    console.error('Failed to load user', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        return res.data;
    };

    const register = async (userData) => {
        const res = await axios.post(`${API_URL}/api/auth/register`, userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
