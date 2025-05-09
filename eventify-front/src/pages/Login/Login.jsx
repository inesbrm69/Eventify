import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form } from "../../components/organisms/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <Form setUser={(user) => login(user, navigate)} />
        </div>
    
);
};

export default Login;