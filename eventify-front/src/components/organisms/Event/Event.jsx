import React, { useState, useEffect } from "react";
import { CardInfo } from "../../molecules";

const Event = ({ title, description, date, image }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <CardInfo title={title} description={description} date={date} image={image} />
        </div>
    );
}

export default Event;