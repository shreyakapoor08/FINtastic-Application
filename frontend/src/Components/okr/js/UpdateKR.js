// Author -
// Ramandeep Kaur
import React, { useState } from 'react';
import '../css/CustomPopUp.css';

const UpdateKR = ({ message, onConfirm, onCancel, onClose }) => {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(parseInt(e.target.value));
  };

  return (
    <div className="custom-popup">
      <div className="custom-popup-content">
        <span className="close-button" onClick={onClose}>×</span>
        <div className="custom-popup-message">{message}</div>
        <div className="custom-popup-input">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="custom-popup-input">
          <label>Progress:</label>
          <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange} />
          <span>{progress}%</span>
        </div>
        <div className="custom-popup-buttons">
          <button onClick={() => onConfirm({ title, progress })}>Update Key Result</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateKR;
