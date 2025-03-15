import React from "react";
import { Filter, Search } from "../../molecules";

const SearchBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
        </div>
    );
};

export default SearchBar;