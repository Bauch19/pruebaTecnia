import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export const Calificacion = ({ 
    onChange, 
    defaultValue,
}) => {
    const [rating, setRating] = useState(defaultValue || 0);

    const handleClick = (value) => {
        setRating(value);
        if (onChange) {
            onChange(value);
        }
    };
    
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        {[1, 2, 3, 4, 5].map((value, index) => (
            <span key={index} style={{ marginRight: '0.2rem', cursor: 'pointer' }}
                onClick={() => handleClick(value)}
            >
            {rating >= value ? (
                <FaStar className="icon" style={{ fontSize: '0.8rem', color: '#EDA836' }} />
            ) : rating >= value - 0.5 ? (
                <FaStar className="icon" style={{ fontSize: '0.8rem', color: '#EDA836' }} />
            ) : (
                <FaStar className="icon" style={{ fontSize: '0.8rem', color: '#dbdbdb' }} />
            )}
            </span>
        ))}
        </div>
    );
};
