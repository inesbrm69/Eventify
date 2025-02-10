import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./src/pages/Login/Login";

const Router = () => {  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;