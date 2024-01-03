import React, { useState } from 'react';
import "./Modal.css"

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (question: string, answer: string, status: string) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onAddCard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('Noted');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard(question, answer, status);
    setQuestion('');
    setAnswer('');
    setStatus('Noted');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Answer:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Learned">Learned</option>
              <option value="Want to Learn">Want to Learn</option>
              <option value="Noted" defaultChecked>Noted</option>
            </select>
          </div>
          <button type="submit">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
