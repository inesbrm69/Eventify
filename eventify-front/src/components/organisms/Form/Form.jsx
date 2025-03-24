import React, { useEffect, useState } from "react";
import { Button } from "../../atoms/index";
import { loginUser, getLoggedUser, logoutUser, getAllUsers } from "../../../services/api";

const Form = ({ setUser }) => {
    const [users, setUsers] = useState([]);
    const loggedUser = getLoggedUser();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                console.log("Utilisateurs chargés :", userList);
                setUsers(userList);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs", error);
            }
        };
    
        fetchUsers();
    }, []);    

    const handleLogin = (user) => {
        loginUser(user);
        setUser(user);
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold text-center">Sélectionner un utilisateur</h2>
                {loggedUser ? (
                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4">
                            Connecté en tant que : {loggedUser.email}
                        </p>
                        <Button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
                            Se déconnecter
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {users.length === 0 ? (
                            <p className="text-center text-red-500">Aucun utilisateur trouvé.</p>
                            ) : (
                                users.map((user) => (
                                    <Button
                                        key={user.id}
                                        onClick={() => handleLogin(user)}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        {user.email}
                                    </Button>
                                ))
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;