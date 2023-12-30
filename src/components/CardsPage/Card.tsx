import { useState } from 'react';
import './Card.css';

export interface CardProps {
    question: string;
    answer: string;
}

const Card = ({ question, answer }: CardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="front">
                {question}
            </div>
            <div className="back">
                {answer}
            </div>
        </div>
    );
};

export default Card;
