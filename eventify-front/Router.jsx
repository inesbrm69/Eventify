import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./src/pages/Login/Login";
import Events from "./src/pages/Events/Events";
import PrivateRoute from "./src/components/PrivateRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/listeEvent"
                    element={
                        <PrivateRoute>
                            <Events />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;