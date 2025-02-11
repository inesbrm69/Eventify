import React, { useState, useEffect } from "react";
import { Card, Title, Text } from "../../atoms";

const CardInfo = ({ title, description, date, category, localisation, image, ...props }) => {
    const [dateEvent, setDateEvent] = useState("");

    useEffect(() => {
        if (date) {
            const eventDate = new Date(date);
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            setDateEvent(eventDate.toLocaleDateString("fr-FR", options));
        }
    }, [date]);

    return (
        <Card {...props}>
            <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <Title className="text-title font-bold">{title}</Title>
                    <Text className="text-subtitle text-gray-600">{dateEvent}</Text>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    {category && <Text className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{category}</Text>}
                    {localisation && <Text>{localisation}</Text>}
                </div>
                <Text className="text text-gray-800 mb-4">{description}</Text>
                {image && <img src={image} alt={title} className="rounded-lg" />}
            </div>
        </Card>
    );
};

export default CardInfo;