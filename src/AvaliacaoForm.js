import React, { useState } from 'react';

export default function AvaliacaoForm({ local, onClose }) {
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Avaliação enviada!\nNota: ${nota}\nComentário: ${comentario}`);
    onClose();
  };

  return (
    <div style={estilos.overlay}>
      <div style={estilos.modal}>
        <h2>Avaliar: {local.nome}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nota (0 a 5):
            <input type="number" min="0" max="5" value={nota} onChange={(e) => setNota(e.target.value)} required />
          </label>
          <br />
          <label>
            Comentário:
            <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Enviar Avaliação</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

const estilos = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '300px',
  }
};
