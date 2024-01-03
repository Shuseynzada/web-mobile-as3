import { MouseEventHandler, useReducer, useState } from 'react';
import './Card.css';
import { completeEdit, deleteIcon, editPen, turnCardIn, turnCardOut } from '../../assets';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface CardProps {
    id: number,
    question: string,
    answer: string,
    status: string
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


const Card = ({ card, deleteCard }: { card: CardProps, deleteCard: () => void }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableContent, dispatchContent] = useReducer(editContentReducer, card);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };
    const handleEditClick: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isEdit) {
            handlePut()
            setIsEdit(false);
        } else {
            setIsEdit(true)
        }
    };

    const handlePut = () => {
        axios.put(import.meta.env.VITE_API_KEY + "/flashcards/" + card.id, editableContent)
            .then((e: AxiosResponse) => {
                console.log("Update Successful")
            })
            .catch((e: AxiosError) => {
                console.log("Error: " + e.message)
            })
    }

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="front">
                <div>{card.id}</div>
                <div className='editable-content'
                    contentEditable={isEdit}
                    onBlur={(e) => dispatchContent({ type: CardActionTypes.UPDATE_QUESTION, payload: e.currentTarget.textContent || "" })}
                    suppressContentEditableWarning={true}
                >
                    {editableContent.question}
                </div>

                <div className="card-actions">
                    <button className="turn-button" onClick={handleCardClick}>
                        <img src={turnCardIn} style={{ height: "30px" }} />
                    </button>
                    <div className="edit-button" onClick={handleEditClick}>
                        {isEdit
                            ? <img src={completeEdit} alt="complete edit" />
                            : <img src={editPen} alt="edit pen" />
                        }
                    </div>
                    <button className="delete-button" onClick={deleteCard}>
                        <img src={deleteIcon} style={{ height: "30px" }} />
                    </button>

                </div>
            </div>
            <div className="back">
                <div>{card.id}</div>
                <div className='editable-content'
                    contentEditable={isEdit}
                    onBlur={(e) => dispatchContent({ type: CardActionTypes.UPDATE_ANSWER, payload: e.currentTarget.textContent || "" })}
                    suppressContentEditableWarning={true}
                >
                    {editableContent.answer}
                </div>
                <div>Status:{card.status}</div>
                <div className="card-actions">
                    <button className="turn-button" onClick={handleCardClick}>
                        <img src={turnCardOut} style={{ height: "30px" }} />
                    </button>
                    <div className="edit-button" onClick={handleEditClick}>
                        {isEdit
                            ? <img src={completeEdit} alt="complete edit" />
                            : <img src={editPen} alt="edit pen" />
                        }
                    </div>
                    <button className="delete-button" onClick={deleteCard}>
                        <img src={deleteIcon} style={{ height: "30px" }} />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Card;