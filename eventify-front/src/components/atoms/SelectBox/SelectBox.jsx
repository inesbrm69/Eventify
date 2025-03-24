import React from "react";

const SelectBox = ({ selectedValue, setSelectedValue, options, title }) => {
    return (
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="p-2 border rounded-md w-full md:w-1/2"
      >
        <option value="">{title}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };
  
  export default SelectBox;
  