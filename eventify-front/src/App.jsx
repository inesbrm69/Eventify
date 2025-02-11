import React from "react";
import AuthProvider from "./pages/context/AuthContext";
import Router from "../Router";
import "./utils/script";

const App = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
};

export default App;