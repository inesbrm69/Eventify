import React from "react";
import { Filter, Search } from "../../molecules";
import { EventCreationPanel} from "../index";

const FiltersBar = ({ 
    searchTerm, setSearchTerm, 
    selectedCategory, setSelectedCategory, 
    categories, sortOrder, setSortOrder,
    setEvents
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
            
            <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
                {sortOrder === "asc" ? "Trier par date ↓" : "Trier par date ↑"}
            </button>

            <EventCreationPanel setEvents={setEvents} />
        </div>
    );
};

export default FiltersBar;
