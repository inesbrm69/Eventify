import React, { useState } from "react";
import axios from 'axios';
import { Form } from "../../components/organisms";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post('http://localhost:8000/api/login_check', {
            email: email,
            password: password,
        });
        console.log(response.data);
        } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <Form 
        onSubmit={handleSubmit} 
        setEmail={setEmail}
        setPassword={setPassword}>
        </Form>
    );
  };