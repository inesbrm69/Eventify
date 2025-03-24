import React, { useState, useEffect } from "react";
import { Card, Title, Text, Button } from "../../atoms";
import { toggleUserEvent } from "../../../services/api";

const CardInfo = ({ eventId, title, description, date, category, localisation, image, events, setEvents }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    // Déterminer la couleur de la carte en fonction de la proximité de l'événement
    const getEventColor = (eventDate) => {
        const now = new Date();
        const eventDay = new Date(eventDate);
        const diffTime = eventDay - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 2) return "bg-red-500 text-white"; // Urgent : Événement dans 2 jours ou moins
        if (diffDays <= 7) return "bg-yellow-500 text-black"; // Rappel : Événement dans 7 jours ou moins
        return "bg-white text-black"; // Normal : Événement lointain
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && Array.isArray(events)) {
            const event = events.find(event => event.id === eventId);
            if (event && Array.isArray(event.participants)) {
                setIsRegistered(event.participants.includes(user.id));
            }
        }
    }, [events, eventId]);

    const handleToggle = async () => {
        try {
            const updatedEvent = await toggleUserEvent(eventId);
            const user = JSON.parse(localStorage.getItem("user"));
            const isNowRegistered = updatedEvent.participants.includes(String(user.id));
            setIsRegistered(isNowRegistered);
    
            // Met à jour `events`
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === updatedEvent.id ? updatedEvent : event
                )
            );
        } catch (error) {
            alert("Erreur lors de la mise à jour.");
            console.error(error);
        }
    };

    return (
        <Card className={`max-w-md w-[500px] h-[400px] flex flex-col justify-between ${getEventColor(date)}`}>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    {image && <img src={`http://localhost:3001/uploads/${image}`} alt={title} className="size-28 rounded-lg" />}
                    <Text className="text-subtitle text-gray-600">{date}</Text>
                </div>
                <Title className="text-lg font-bold text-primary-500 mb-2">{title}</Title>
                <Text className="text text-gray-800 mb-4">{description}</Text>
                <div className="flex justify-between text-sm text-gray-600">
                    {localisation && <Text>{localisation}</Text>}
                    {category && <Text className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{category}</Text>}
                </div>
            </div>
            <Button
                onClick={handleToggle}
                className={`px-4 py-2 mt-4 rounded ${isRegistered ? "bg-red-500" : "bg-blue-500"} text-white`}
            >
                {isRegistered ? "Se désinscrire" : "S'inscrire"}
            </Button>
        </Card>
    );
};

export default CardInfo;