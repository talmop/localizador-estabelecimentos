import React, { useState } from 'react';
import './App.css';

function AvaliacaoForm({ local, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Avaliação enviada para ${local.nome}\nNota: ${rating}\nComentário: ${comment}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Avaliar: {local.nome}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nota (0-5):</label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Comentário:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AvaliacaoForm;