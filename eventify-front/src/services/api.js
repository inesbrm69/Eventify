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

export const getEvent = async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
};

export const searchEvents = async (searchTerm, category) => {
    try {
        const allEvents = await getAllEvents();

        let filteredEvents = allEvents;

        if (searchTerm) {
            filteredEvents = filteredEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category) {
            filteredEvents = filteredEvents.filter(event => event.category.toLowerCase() === category.toLowerCase());
        }

        return filteredEvents;
    } catch (error) {
        console.error("Erreur lors du filtrage des événements :", error);
        throw error;
    }
};

export const addUserIntoEvents = async (eventId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("Aucun utilisateur connecté.");

        const eventResponse = await api.get(`/events/${eventId}`);
        const event = eventResponse.data;

        const participants = event.participants || [];
        if (!participants.includes(user.id)) {
            participants.push(user.id);
        }

        const updatedEvent = { ...event, participants };
        const response = await api.patch(`/events/${eventId}`, updatedEvent);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription à l'événement :", error);
        throw error;
    }
};

//Events
export const getEventByCategorie = (id) => api.get(`/events/categ/${id}`);