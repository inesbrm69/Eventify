import React, { useState, useEffect } from "react";
import { searchEvents, getAllEvents } from "../../services/api";
import { Event, FiltersBar, EventCreationPanel } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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

    // Mettre à jour `filteredEvents` lors d'une recherche ou d'un changement de tri
    useEffect(() => {
        searchEvents(searchTerm, selectedCategory)
            .then(events => {
                setFilteredEvents(sortEventsByDate(events, sortOrder));
            })
            .catch((error) => console.error("Erreur lors de la recherche :", error));
    }, [searchTerm, selectedCategory, events, sortOrder]);

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