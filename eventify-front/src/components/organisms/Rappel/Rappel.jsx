import React, { useState, useEffect } from "react";
import { Title, Button } from "../../atoms";
import { CardInfo } from "../../molecules";

const Rappel = ({ events, setEvents }) => {
    const [rappelEvents, setRappelEvents] = useState([]);

    useEffect(() => {
        const now = new Date();
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
            return diffDays >= 0 && diffDays <= 7;
        });

        setRappelEvents(upcomingEvents);
    }, [events]);

    if (rappelEvents.length === 0) return null; // Ne rien afficher si aucun rappel

    return (
        <div className="w-screen bg-yellow-100 p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-2">
                <Title className="text-lg font-bold text-yellow-700">📌 Rappels</Title>
                <Button onClick={() => setRappelEvents([])} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    ✖ Tout supprimer
                </Button>
            </div>

            {/* Conteneur scrollable */}
            <div className={`flex flex-col overflow-x-auto ${rappelEvents.length > 3 ? "pb-2" : ""}`}>
                <div className="flex gap-x-6 px-4">
                    {rappelEvents.map((event) => (
                        <div key={event.id} className="w-[500px] flex-shrink-0 relative">
                            <CardInfo
                                eventId={event.id}
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rappel;