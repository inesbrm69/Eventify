import React, { useState, useNavigate } from 'react';
import { Champ } from '../../molecules/index';

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Champ
            text="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            
            <Champ
            text="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

export default Form;