import React, { useState, useEffect } from "react";
import { searchEvents, getAllEvents, getLoggedUser } from "../../services/api";
import { Event, FiltersBar } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showUserEvents, setShowUserEvents] = useState(false);

    const user = getLoggedUser(); // Récupérer l'utilisateur connecté

    // Charger tous les événements au montage
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await getAllEvents();
                setEvents(allEvents);
                setFilteredEvents(allEvents);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements :", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Fonction pour trier les événements par date
    const sortEventsByDate = (events, order) => {
        return [...events].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
    };

    // Fonction pour récupérer les événements auxquels l'utilisateur est inscrit
    const getUserEvents = () => {
        if (!user) return [];
        return events.filter(event => event.participants.includes(user.id));
    };

    // Mettre à jour `filteredEvents` lors d'une recherche ou d'un changement de tri
    useEffect(() => {
        const eventList = showUserEvents ? getUserEvents() : events;
        searchEvents(searchTerm, selectedCategory)
            .then(events => {
                setFilteredEvents(sortEventsByDate(eventList, sortOrder));
            })
            .catch((error) => console.error("Erreur lors de la recherche :", error));
    }, [searchTerm, selectedCategory, events, sortOrder, showUserEvents]);

    return (
        <div className="p-4">
            <FiltersBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                categories={[...new Set(events.map(event => event.category))]} 
                sortOrder={sortOrder} 
                setSortOrder={setSortOrder} 
                setEvents={setEvents}
            />
            {user && (
                <button
                    onClick={() => setShowUserEvents(!showUserEvents)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
                >
                    {showUserEvents ? "Voir tous les événements" : "Voir mes événements"}
                </button>
            )}

            <div className="flex flex-wrap justify-center gap-6 p-6">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            date={new Date(event.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}                              
                            category={event.category}
                            localisation={event.localisation}
                            image={event.image}
                            participants={event.participants}
                            events={events}  
                            setEvents={setEvents}  
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucun événement trouvé</p>
                )}
            </div>
        </div>
    );
};

export default Events;