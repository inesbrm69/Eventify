import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

const uploadApi = axios.create({
  baseURL: 'http://localhost:3001', // backend upload
});

export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user)); // Stocker l'utilisateur connecté
};

export const getLoggedUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Déconnexion
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

// Récupérer tous les événements
export const getAllEvents = async () => {
    try {
        const response = await api.get('/events'); 
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        throw error;
    }
};

// Récupérer un seul événement par ID
export const getEvent = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    throw error;
  }
};

// Recherche par mot-clé et/ou catégorie
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

// S'inscrire / se désinscrire d'un événement
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

// Obtenir tous les événements d'une catégorie
export const getEventByCategorie = async (categoryName) => {
  try {
    const allEvents = await getAllEvents();
    return allEvents.filter(event => event.category.toLowerCase() === categoryName.toLowerCase());
  } catch (error) {
    console.error("Erreur lors du filtrage par catégorie :", error);
    throw error;
  }
};

// Créer un événement
export const createEvent = async (eventData) => {
  try {
    const response = await api.get("/events");
    const events = response.data;

    const maxId = events.length > 0 ? Math.max(...events.map(e => parseInt(e.id, 10))) : 0;
    const newId = (maxId + 1).toString();

    const newEvent = {
      id: newId,
      ...eventData,
      participants: []
    };

    const createdEvent = await api.post("/events", newEvent);
    return createdEvent.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
    throw error;
  }
};

// Upload l'image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // ce nom est OK

  const response = await fetch("http://localhost:3001/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.image;
};
