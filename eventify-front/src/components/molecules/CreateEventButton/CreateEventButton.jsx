import React from "react";
import { Button } from "../../atoms";

const CreateEventButton = ({ onClick }) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
            Créer un événement
        </Button>
    );
};

export default CreateEventButton;