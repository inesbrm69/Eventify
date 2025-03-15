import React, { useState, useEffect } from "react";
import { Card, Title, Text, Button } from "../../atoms";
import { addUserIntoEvents } from "../../../services/api";

const CardInfo = ({ title, description, date, category, localisation, image, eventId }) => {
    const handleRegister = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user")); 
            if (!user) {
                alert("Vous devez être connecté pour vous inscrire !");
                return;
            }
    
            // Appel de l'API pour inscrire l'utilisateur à l'événement
            await addUserIntoEvents(eventId, user.id);
    
            // Mettre à jour localement les participants
            setEvents((prevEvents) =>
                prevEvents.map((event) => {
                    if (event.id === eventId) {
                        return {
                            ...event,
                            participants: [...(event.participants || []), user.id],
                        };
                    }
                    return event;
                })
            );
    
            alert("Vous êtes inscrit à cet événement !");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur s'est produite lors de l'inscription.");
        }
    };

    return (
        <Card>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    {image && <img src={image} alt={title} className="size-28 rounded-lg" />}
                    <Text className="text-subtitle text-gray-600">{date}</Text>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <Title className="text-subtitle font-bold text-primary-400">{title}</Title>
                    {category && <Text className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{category}</Text>}
                </div>
                <Text className="text text-gray-800 mb-4">{description}</Text>
                <div className="flex justify-between text-end text-text-700 bold">
                    {localisation && <Text>{localisation}</Text>}
                </div>
                <Button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                    S'inscrire
                </Button>
            </div>
        </Card>
    );
};

export default CardInfo;