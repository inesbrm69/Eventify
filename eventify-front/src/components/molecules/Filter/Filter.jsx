import React from "react";

const Filter = ({ selectedCategory, setSelectedCategory, categories }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/4"
        >
            <option value="">Toutes les catégories</option>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
};

export default Filter;