import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../services/api";

const PrivateRoute = ({ children }) => {
    const user = getLoggedUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;