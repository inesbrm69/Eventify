import React from 'react';
import { Input, Title } from '../../atoms/index';

const Champ = ({ type, placeholder, text, className, icon, ...props }) => {
    return (
        <div className="flex w-2/3 justify-center place-items-center gap-4">
            <Title className="text-subtitle">{text}</Title>
            <Input
                type={type}
                placeholder={placeholder}
                className={className}
                icon={icon}
                {...props}
            />
        </div>
    );
};

export default Champ;
