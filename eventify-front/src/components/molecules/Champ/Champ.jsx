import React from 'react';
import { Input, Title } from '../../atoms/index';

const Champ = ({ type, placeholder, text, className, icon }) => {
    return (
        <div className="relative flex items-center">
            <Title className="text-title">{text}</Title>
            <Input type={type} placeholder={placeholder} className={className} icon={icon} />
        </div>
    );
}

export default Champ;
