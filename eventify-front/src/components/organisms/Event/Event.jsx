import React, { useState, useEffect } from "react";
import { CardInfo } from "../../molecules";

const Event = ({ title, description, date, category, localisation, image }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <CardInfo title={title} description={description} date={date} category ={category} localisation={localisation} image={image} />
        </div>
    );
}

export default Event;