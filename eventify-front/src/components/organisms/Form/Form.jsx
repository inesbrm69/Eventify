import React, { useState, useNavigate } from 'react';
import { Champ } from '../../molecules/index';

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className="">
            <Champ
            text="Email"
            type="email"
            className="px-7 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            
            <Champ
            text="Password"
            type="password"
            className="px-7 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

export default Form;