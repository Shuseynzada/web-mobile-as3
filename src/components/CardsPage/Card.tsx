import React, { useState } from 'react';
import './Card.css';

interface CardProps {
    question: string;
    answer: string;
}

const Card = ({ question, answer }: CardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcard" onClick={handleClick}>
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <div className="front">
                    {question}
                </div>
                <div className="back">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default Card;
