import React from "react";
import { Champ } from "../../molecules/index";
import { Button } from "../../atoms/index";

const Form = ({ onSubmit, email, setEmail, password, setPassword }) => {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Champ
                    id="email"
                    text="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <Champ
                    id="password"
                    text="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Connexion
                </Button>
            </form>
        </div>
    );
};

export default Form;
