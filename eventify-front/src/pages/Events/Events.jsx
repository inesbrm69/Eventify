import React, { useState, useEffect } from "react";
import { searchEvents, getAllEvents } from "../../services/api";
import { Event, SearchBar } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        getAllEvents()
            .then((allEvents) => {
                setEvents(allEvents);
                setFilteredEvents(allEvents);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des événements :", error);
                setLoading(false);
            });
    }, []);

    // Mettre à jour la liste des événements lorsqu'un filtre est modifié
    useEffect(() => {
        searchEvents(searchTerm, selectedCategory)
            .then(setFilteredEvents)
            .catch((error) => console.error("Erreur lors de la recherche :", error));
    }, [searchTerm, selectedCategory]);

    return (
        <div className="p-4">
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                categories={[...new Set(events.map(event => event.category))]} 
            />
            
            <div className="flex flex-wrap justify-center">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            date={event.date}
                            category={event.category}
                            localisation={event.localisation}
                            image={event.image}
                            events={events}  // Passe bien events
                            setEvents={setEvents}  // Passe bien setEvents
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