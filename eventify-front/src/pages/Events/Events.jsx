import React, { useState, useEffect } from "react";
import { Event } from "../../components/organisms";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
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
                        image={event.image}
                        className="m-4"
                    />
                ))
            )}
        </div>
    );
};

export default Events;