import React, { createContext, useState, useEffect } from "react";
import { getLoggedUser, loginUser, logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = getLoggedUser();
        if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (selectedUser, navigate) => {
        loginUser(selectedUser);
        setUser(selectedUser);
        setIsAuthenticated(true);
        navigate("/listeEvent"); // Redirection après connexion
    };

    const logout = (navigate) => {
        logoutUser();
        setUser(null);
        setIsAuthenticated(false);
    };    

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;