import React, { useState } from "react";
import { CreateEventButton } from "../../molecules";
import { EventForm } from "../../organisms";

const EventCreationPanel = ({ setEvents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <CreateEventButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-md w-full max-w-xl relative">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-2 right-4 text-xl text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                    <EventForm
                        onSubmit={() => {
                            setIsModalOpen(false);
                        }}
                        setEvents={setEvents}
                    />
                    </div>
                </div>
            )}
        </>
    );
};

export default EventCreationPanel;