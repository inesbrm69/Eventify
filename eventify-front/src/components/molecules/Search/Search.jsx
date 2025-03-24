import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/2"
        />
    );
};

export default Search;