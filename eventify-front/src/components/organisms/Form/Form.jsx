import React from 'react';
import { Champs } from '../../molecules/index';

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        axios.post('http://localhost:8000/api/login_check', { username, password })
            .then(response => {
            accountService.saveToken(response.data.token)
            accountService.saveResfreshToken(response.data.refresh_token)
            axios.get(`http://localhost:8000/api/user/${username}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(userResponse => {
                const userId = userResponse.data.id;
                navigate(`/home/${userId}`);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'ID de l'utilisateur:", error);
                if (error.response && error.response.status === 401) {
                navigate("/");
                }
            });
            })
            .catch(error => {
            console.error("Erreur de connexion:", error);
            if (error.response && error.response.status === 401) {
                navigate("/");
            }
            });
        };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Champs
            text="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            
            <Champs
            text="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button text="Login" onClick={handleLogin} />
        </div>
    );
};

export default Form;