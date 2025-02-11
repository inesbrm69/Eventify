import React, { useState, useEffect } from "react";
import { Event } from "../../components/organisms";
import { getAllEvents } from '../../services/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEvents()
            .then((allEvents) => {
                setEvents(allEvents);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des événements :", error);
                setLoading(false);
            });
      }, []);

    return (
        <div className="flex flex-wrap justify-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                events.map((event) => (
                    <Event
                        key={event.id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        category={event.category}
                        localisation={event.localisation}
                        image={event.image}
                        className="m-4"
                    />
                ))
            )}
        </div>
    );
};

export default Events;