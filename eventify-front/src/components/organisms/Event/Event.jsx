import React from "react";
import { CardInfo } from "../../molecules";

const Event = ({ id, title, description, date, category, localisation, image, events, setEvents }) => {
    return (
        <div>
           <CardInfo
                eventId={id}
                title={title}
                description={description}
                date={date}
                category={category}
                localisation={localisation}
                image={image}
                events={events || []}
                setEvents={setEvents}
            />
        </div>
    );
};

export default Event;