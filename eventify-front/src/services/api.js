import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:3000/'
});

export const login = async (email, password) => {
    try {
        const response = await api.get('/profiles'); 
        const users = response.data;
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
        }

        const token = btoa(JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user };

    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'Erreur de connexion' 
        };
    }
};

export const getAllEvents = async () => {
    try {
        const response = await api.get('/events'); 
        const categories = response.data;

        const allEvents = Object.entries(categories).flatMap(([key, categoryData]) => 
            categoryData.items.map(event => ({
                ...event,
                category: categoryData.category || key
            }))
        );

        return allEvents;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        throw error;
    }
};



//Users
export const getUsers = () => api.get('/profiles');

//Events
export const getEventByCategorie = (id) => api.get(`/events/categ/${id}`);
export const getEvent = (id) => api.get(`/events/${id}`);