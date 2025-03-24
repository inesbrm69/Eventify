import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

//
// Login
//
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

//
// Récupérer tous les événements
//
export const getAllEvents = async () => {
    try {
        const response = await api.get('/events'); 
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        throw error;
    }
};

//
// Récupérer un seul événement par ID
//
export const getEvent = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    throw error;
  }
};

//
// Recherche par mot-clé et/ou catégorie
//
export const searchEvents = async (searchTerm, category) => {
    try {
        const allEvents = await getAllEvents(); // tableau [{...}, {...}]

        let filteredEvents = allEvents;

        if (searchTerm) {
            filteredEvents = filteredEvents.filter(event =>
                event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.localisation?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category && category !== "") {
            filteredEvents = filteredEvents.filter(event =>
                (event.category || "").toLowerCase() === category.toLowerCase()
            );
        }

        return filteredEvents;
    } catch (error) {
        console.error("Erreur lors du filtrage des événements :", error);
        throw error;
    }
};


//
// S'inscrire / se désinscrire d'un événement
//
export const toggleUserEvent = async (eventId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("Utilisateur non connecté");

        // Récupération de l'événement par ID
        const res = await api.get(`/events/${eventId}`);
        const event = res.data;

        const userId = String(user.id);
        let updatedParticipants = [...(event.participants || [])];

        if (updatedParticipants.includes(userId)) {
            // Désinscription
            updatedParticipants = updatedParticipants.filter(id => id !== userId);
        } else {
            // Inscription
            updatedParticipants.push(userId);
        }

        // Mise à jour via PATCH
        const patchRes = await api.patch(`/events/${eventId}`, {
            participants: updatedParticipants,
        });

        return patchRes.data;
    } catch (error) {
        console.error("PATCH error:", error);
        throw new Error("Erreur lors de la mise à jour.");
    }
}; 

//
// Obtenir tous les événements d'une catégorie
//
export const getEventByCategorie = async (categoryName) => {
  try {
    const allEvents = await getAllEvents();
    return allEvents.filter(event => event.category.toLowerCase() === categoryName.toLowerCase());
  } catch (error) {
    console.error("Erreur lors du filtrage par catégorie :", error);
    throw error;
  }
};