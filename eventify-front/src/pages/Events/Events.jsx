import React, { useState, useEffect } from "react";
import { Event } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupérer les événements depuis le localStorage
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
        setLoading(false);
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