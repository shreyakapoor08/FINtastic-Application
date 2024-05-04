import React from 'react';
import './CustomPopUp.css'; 

const CustomPopUp = ({ message, onConfirm, onCancel, onClose }) => {
  return (
    <div className="custom-popup">
      <div className="custom-popup-content">
        <span className="close-button" onClick={onClose}>×</span>
        <p>{message}</p>
        <div className="custom-popup-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CustomPopUp;
