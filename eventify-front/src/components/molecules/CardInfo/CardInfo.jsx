import React, { useState, useEffect } from "react";
import { Card } from "../../atoms";

const CardInfo = ({ title, description, date, image, ...props }) => {
    const [dateEvent, setDateEvent] = useState(null);

    useEffect(() => {
        const date = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDateEvent(date.toLocaleDateString('fr-FR', options));
    }, [date]);

    return (
        <Card {...props}>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h3 className="text-title">{title}</h3>
                    <p className="text-subtitle">{dateEvent}</p>
                </div>
                <p className="text">{description}</p>
            </div>
        </Card>
    );
};

export default CardInfo;
