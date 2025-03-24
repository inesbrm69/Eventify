import React, { useState, useEffect } from "react";
import { searchEvents, getAllEvents } from "../../services/api";
import { Event, SearchBar, EventCreationPanel } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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

    useEffect(() => {
        searchEvents(searchTerm, selectedCategory)
            .then(setFilteredEvents)
            .catch((error) => console.error("Erreur lors de la recherche :", error));
    }, [searchTerm, selectedCategory, events]);

    return (
        <div className="p-4">
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                categories={[...new Set(events.map(event => event.category))]} 
            />
            <EventCreationPanel setEvents={setEvents} />
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