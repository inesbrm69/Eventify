import React from "react";

const Card = ({ backgroundColor="rgba(90,145,249,0.25)", ...props }) => {
    return (
        <div style={{backgroundColor:backgroundColor}}>
            <div className={`bg-white shadow-md rounded-lg p-6`}>
                {props.children || "Cette card n'a pas de contenu"}
            </div>
        </div>
    );
};

export default Card;