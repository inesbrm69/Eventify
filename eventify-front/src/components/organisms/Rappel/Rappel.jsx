import React, { useState, useEffect, useMemo } from "react";
import { Title, Button } from "../../atoms";
import { CardInfo } from "../../molecules";

const Rappel = ({ events, setEvents }) => {
    const [rappelEvents, setRappelEvents] = useState([]);
    const [deletedEventIds, setDeletedEventIds] = useState([]);

    const filteredEvents = useMemo(() => {
        const now = new Date();
        return events.filter(event => {
            const eventDate = new Date(event.date);
            const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
            return diffDays >= 0 && diffDays <= 7 && !deletedEventIds.includes(event.id);
        });
    }, [events, deletedEventIds]);

    useEffect(() => {
        setRappelEvents(filteredEvents);
    }, [filteredEvents]);

    if (rappelEvents.length === 0) return null;

    return (
        <div className="w-full bg-yellow-100 p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-2">
                <Title className="text-lg font-bold text-yellow-700">📌 Rappels</Title>
                <Button onClick={() => setDeletedEventIds(rappelEvents.map(event => event.id))}
                        className="bg-red-500 text-white px-4 py-2 rounded-md">
                    ✖ Tout supprimer
                </Button>
            </div>

            <div className="overflow-x-auto w-full">
                <div className="flex gap-x-6 px-4">
                    {rappelEvents.map(event => (
                        <div key={event.id} className="w-[500px] flex-shrink-0">
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