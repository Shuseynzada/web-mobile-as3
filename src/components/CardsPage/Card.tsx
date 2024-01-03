import { MouseEventHandler, useReducer, useState } from 'react';
import './Card.css';
import { completeEdit, editPen } from '../../assets';

export interface CardProps {
    id: number,
    question: string;
    answer: string;
}

enum CardActionTypes {
    UPDATE_QUESTION = 'UPDATE_QUESTION',
    UPDATE_ANSWER = 'UPDATE_ANSWER'
}

interface CardAction {
    type: CardActionTypes;
    payload: string;
}

const editContentReducer = (state: CardProps, action: CardAction) => {
    switch (action.type) {
        case CardActionTypes.UPDATE_QUESTION:
            return { ...state, question: action.payload || state.question };
        case CardActionTypes.UPDATE_ANSWER:
            console.log(action.payload)
            return { ...state, answer: action.payload };
        default:
            return state;
    }
};


const Card = ({ card }: { card: CardProps }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableContent, dispatchContent] = useReducer(editContentReducer, card);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleEditClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setIsEdit(!isEdit);
    };


    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
            <div className="front">
                <div>{card.id}</div>
                <div contentEditable={isEdit} className='tilting' onClick={e => e.stopPropagation()}>{editableContent.question}</div>
                <div className="edit-button" onClick={handleEditClick}>
                    {isEdit
                        ? <img src={completeEdit} alt="complete edit" />
                        : <img src={editPen} alt="edit pen" />
                    }
                </div>
            </div>
            <div className="back">
                <div>{card.id}</div>
                <div
                    contentEditable={true}
                    onClick={e => e.stopPropagation()}
                    onChange={(e: React.FormEvent<HTMLDivElement>) => dispatchContent({
                        type: CardActionTypes.UPDATE_ANSWER,
                        payload: e.currentTarget.textContent || ''
                    })}
                    dangerouslySetInnerHTML={{ __html: editableContent.answer }}
                />
                <div className="edit-button" onClick={handleEditClick} >
                    {isEdit
                        ? <img src={completeEdit} alt="complete edit" />
                        : <img src={editPen} alt="edit pen" />
                    }
                </div>
            </div>
        </div>
    )
};

export default Card;
