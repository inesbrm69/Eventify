import React from "react";

const Card = ({className = "", children, ...props }) => {
    return (
        <div className={`p-4 rounded-lg ${className}`} {...props}>
            <div className="bg-white shadow-md rounded-lg p-6">
                {children || "Cette card n'a pas de contenu"}
            </div>
        </div>
    );
};

export default Card;