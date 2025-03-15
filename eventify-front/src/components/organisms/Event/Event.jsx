import React from "react";
import { CardInfo } from "../../molecules";

const Event = ({ id, title, description, date, category, localisation, image, events, setEvents }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <CardInfo
                eventId={id}
                title={title}
                description={description}
                date={date}
                category={category}
                localisation={localisation}
                image={image}
                events={events}
                setEvents={setEvents}
            />
        </div>
    );
};

export default Event;