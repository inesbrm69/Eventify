import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form } from "../../components/organisms/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password, navigate);
    };

    return (
        <Form 
            onSubmit={handleSubmit} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword}
        />
    );
};

export default Login;
