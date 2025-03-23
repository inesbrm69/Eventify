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
    try {
        const response = await api.get('/events'); // Récupère toutes les catégories
        const categories = response.data;

        let foundEvent = null;
        let categoryKey = null;

        Object.entries(categories).forEach(([key, category]) => {
            const event = category.items.find(e => e.id === parseInt(eventId));
            if (event) {
                foundEvent = event;
                categoryKey = key; // Sauvegarde la catégorie où il se trouve
            }
        });

        if (!foundEvent) {
            throw new Error("Événement non trouvé !");
        }

        return { event: foundEvent, category: categoryKey };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
        throw error;
    }
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

export const toggleUserEvent = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) throw new Error("Utilisateur non connecté");

    const response = await api.get('/events');
    const eventsData = response.data;

    for (const key in eventsData) {
        const category = eventsData[key];
        const index = category.items.findIndex(event => event.id === eventId);

        if (index !== -1) {
            const event = category.items[index];

            // 🔐 Sécurité : on force la comparaison en string
            const userId = String(user.id);
            let updatedParticipants = [...(event.participants || [])];

            if (updatedParticipants.includes(userId)) {
                // Désinscription
                updatedParticipants = updatedParticipants.filter(id => id !== userId);
            } else {
                // Inscription
                updatedParticipants.push(userId);
            }

            // ✏️ Mise à jour de l’événement
            const updatedEvent = {
                ...event,
                participants: updatedParticipants
            };

            // 🧠 Tu n’as pas de vrai backend → on retourne l’objet modifié
            return updatedEvent;
        }
    }

    throw new Error("Événement introuvable");
};

//Events
export const getEventByCategorie = (id) => api.get(`/events/categ/${id}`);