import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/context/AuthContext';

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/" />;
};