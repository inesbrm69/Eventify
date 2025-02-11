import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./src/pages/Login/Login";
import Events from "./src/pages/Events/Events";

const Router = () => {  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/listeEvent" element={<Events />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;