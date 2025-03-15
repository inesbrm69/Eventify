import React from 'react';

const Button = ({ children, className, onClick }) => {
    return (
        <div className="relative mt-5 flex align-center justify-center">
            <button className={className} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default Button;