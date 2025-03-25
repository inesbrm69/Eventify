import React, { useEffect, useState } from "react";
import { Button } from "../../atoms/index";
import { loginUser, getLoggedUser, logoutUser, getAllUsers } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const Form = ({ setUser }) => {
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs", error);
            }
        };

        fetchUsers();

        const user = getLoggedUser();
        if (user) {
            setLoggedUser(user);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (user) => {
        loginUser(user);
        setUser(user);
        setLoggedUser(user);
        navigate("/listeEvent"); // Redirection après connexion
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        setLoggedUser(null);
        navigate("/"); // Retour à la page d'accueil
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="flex flex-col gap-4 p-6 shadow-md rounded-md">
                <h2 className="text-xl font-bold text-center">Sélectionner un utilisateur</h2>

                {isLoading ? (
                    <p className="text-center text-gray-500">Chargement...</p>
                ) : loggedUser ? (
                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4">
                            Connecté en tant que : {loggedUser.email}
                        </p>
                        <div className="flex flex-col gap-2">
                            <Button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
                                Se déconnecter
                            </Button>
                            <Button onClick={() => navigate("/listeEvent")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Retour
                            </Button>
                        </div>
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