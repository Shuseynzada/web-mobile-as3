import { MouseEventHandler, useReducer, useState } from 'react';
import './Card.css';
import { completeEdit, deleteIcon, editPen, turnCardIn, turnCardOut } from '../../assets';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface CardProps {
    id: number,
    question: string,
    answer: string,
    status: string,
    created: string,
    updated: string
}

enum CardActionTypes {
    UPDATE_QUESTION = 'UPDATE_QUESTION',
    UPDATE_ANSWER = 'UPDATE_ANSWER',
    UPDATE_UPDATE = 'UPDATE_UPDATE',
    UPDATE_STATUS = 'UPDATE_STATUS'
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
            return { ...state, answer: action.payload };
        case CardActionTypes.UPDATE_STATUS:
            return { ...state, status: action.payload };
        case CardActionTypes.UPDATE_UPDATE:
            return { ...state, updated: action.payload };
        default:
            return state;
    }
};


const Card = ({ card, deleteCard, selectCard }: { card: CardProps, deleteCard: () => void, selectCard: (a: boolean) => void }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editableContent, dispatchContent] = useReducer(editContentReducer, card);
    const [isSelected, setIsSelect] = useState<boolean>(false)

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
        const updateDate = new Date()
        axios.put(import.meta.env.VITE_API_KEY + "/flashcards/" + card.id, { ...editableContent, updated: updateDate })
            .then((e: AxiosResponse) => {
                console.log("Update Successful")

            })
            .catch((e: AxiosError) => {
                console.log("Error: " + e.message)
            })
    }

    const handleSelectCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelect(e.target.checked)
        selectCard(e.target.checked);
    };


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
                    <div className="select-checkbox">
                        <input
                            type="checkbox"
                            onChange={handleSelectCard}
                            checked={isSelected}
                        />
                    </div>
                    <button className="delete-button" onClick={deleteCard}>
                        <img src={deleteIcon} style={{ height: "30px" }} />
                    </button>
                </div>
            </div>
            <div className="back">
                <div>{card.id}</div>
                <div>
                    <div className='editable-content'
                        contentEditable={isEdit}
                        onBlur={(e) => dispatchContent({ type: CardActionTypes.UPDATE_ANSWER, payload: e.currentTarget.textContent || "" })}
                        suppressContentEditableWarning={true}
                    >
                        {editableContent.answer}
                    </div>
                    <div className="card-info flex flex-col">
                        {isEdit
                            ? <div className="card-status">
                                <label>Status:</label>
                                <select onChange={(e) => { dispatchContent({ type: CardActionTypes.UPDATE_STATUS, payload: e.currentTarget.value }) }}>
                                    <option>Learned</option>
                                    <option>Want to Learn</option>
                                    <option>Noted</option>
                                </select>
                            </div>
                            : <div className="card-status">Status: {editableContent.status}</div>
                        }
                        <div className="card-created">Created: {editableContent.created}</div>
                        <div className="card-updated">Updated: {editableContent.updated}</div>
                    </div>
                </div>

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
                    <div className="select-checkbox">
                        <input
                            type="checkbox"
                            onChange={handleSelectCard}
                            checked={isSelected}
                        />
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