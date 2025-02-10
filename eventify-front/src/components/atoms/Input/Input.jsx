import React, { useState } from 'react';

const Input = ({ type, placeholder }) => {
    return (
        <div>
            <input
            type={type}
            placeholder={placeholder}
            className={`ml-7 py-2 border-b-2 border-primary-500 text-primary-500 font-poppins text-subtitle`}/>
        </div>
    );
}

export default Input;