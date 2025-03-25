import React, { useState, useEffect } from "react";
import { Card, Title, Text, Button } from "../../atoms";
import { toggleUserEvent } from "../../../services/api";

const CardInfo = ({ eventId, title, description, date, category, localisation, image, events, setEvents }) => {
    const [isRegistered, setIsRegistered] = useState(false);

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

    // Fonction pour déterminer le message selon la proximité de l'événement
    const getEventMessage = (eventDate) => {
        const now = new Date();
        const eventDay = new Date(eventDate);
        const diffDays = Math.ceil((eventDay - now) / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 2) return "L'événement se déroulera dans moins de 2 jours !";
        if (diffDays >= 0 && diffDays <= 7) return "L'événement se déroulera dans moins de 7 jours.";
        return "";
    };

    return (
        <Card className="max-w-md w-[500px] h-[400px] flex flex-col justify-between text-black">
            <div className="flex justify-between items-center mb-2">
                {image && <img src={`http://localhost:3001/uploads/${image}`} alt={title} className="size-28 rounded-lg" />}
                <Text className="text-subtitle text-gray-600">{date}</Text>
            </div>
            <Title className="text-lg font-bold text-primary-500 mb-2">{title}</Title>
            <Text className="text text-gray-800 mb-4">{description}</Text>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                {localisation && <Text>{localisation}</Text>}
                {category && <Text className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{category}</Text>}
            </div>
            {getEventMessage(date) && (
                <Text className="mt-2 text-sm font-semibold text-red-600">
                    {getEventMessage(date)}
                </Text>
            )}
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