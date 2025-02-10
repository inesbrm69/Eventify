import React from 'react';
import { Input, Title } from '../../atoms/index';

const Champ = ({ type, placeholder, text, className, icon, ...props  }) => {
    return (
        <div className="flex w-2/3 justify-center place-items-center">
            <Title className="text-subtitle">{text}</Title>
            <Input type={type} placeholder={placeholder} className={className} icon={icon} />
        </div>
    );
}

export default Champ;
