import React from 'react';
import type { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    cursor = 'default',
    'data-testid': testId
}) => {
    const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 ease-in-out';
    const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105 hover:-translate-y-1' : '';

    const cursorClasses = cursor === 'pointer' ? 'cursor-pointer' :
        cursor === 'none' ? 'cursor-none' :
            'cursor-default';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${cursorClasses} ${className}`}
            data-testid={testId}
        >
            {children}
        </div>
    );
};

export default Card;