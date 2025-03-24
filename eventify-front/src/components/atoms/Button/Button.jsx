import React from 'react';

const Button = ({ children, className, onClick }) => {
    return (
        <div className="relative flex align-center justify-center">
            <button className={className} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default Button;