import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { searchEvents, getAllEvents, getLoggedUser } from "../../services/api";
import { Event, FiltersBar, Rappel } from "../../components/organisms";
import { Button } from "../../components/atoms";

const Events = () => {
    const { logout } = useContext(AuthContext); // Récupérer la fonction logout
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showUserEvents, setShowUserEvents] = useState(false);

    const user = getLoggedUser(); // Récupérer l'utilisateur connecté

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

    const sortEventsByDate = (events, order) => {
        return [...events].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
    };

    const getUserEvents = () => {
        if (!user) return [];
        return events.filter(event => event.participants.includes(user.id));
    };

    useEffect(() => {
        const filterAndSortEvents = async () => {
            try {
                const eventList = showUserEvents ? getUserEvents() : events;
                let filtered = eventList;

                if (searchTerm || selectedCategory) {
                    filtered = await searchEvents(searchTerm, selectedCategory);
                }

                setFilteredEvents(sortEventsByDate(filtered, sortOrder));
            } catch (error) {
                console.error("Erreur lors du filtrage :", error);
            }
        };

        filterAndSortEvents();
    }, [searchTerm, selectedCategory, events, sortOrder, showUserEvents]);

    return (
        <div className="p-4">
            {user && (
                <div className="flex justify-between mb-4">
                    <Button
                        onClick={() => setShowUserEvents(!showUserEvents)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        {showUserEvents ? "Voir tous les événements" : "Voir mes événements"}
                    </Button>

                    <Button
                        onClick={() => logout()}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Déconnexion
                    </Button>
                </div>
            )}
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

            <Rappel events={events} setEvents={setEvents} />
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