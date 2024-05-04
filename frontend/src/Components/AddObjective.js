// Author -
// Ramandeep Kaur
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomPopUp from './CustomPopUp'; 
import './AddObjective.css'; 

const AddObjective = () => {
  const [title, setTitle] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [timeframeError, setTimeframeError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show custom pop-up box
      setShowPopUp(true);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!title) {
      setTitleError('Title is required.');
      isValid = false;
    } else if (title.length > 100) {
      setTitleError('Title must be less than 100 characters.');
      isValid = false;
    } else {
      setTitleError('');
    }
    if (!timeframe) {
      setTimeframeError('Timeframe is required.');
      isValid = false;
    } else {
      setTimeframeError('');
    }
    return isValid;
  };

  const handleConfirm = () => {
    
    console.log('Title:', title, 'Timeframe:', timeframe);
    // Close pop-up box
    setShowPopUp(false);
    // Clear form fields
    setTitle('');
    setTimeframe('');
  };

  const handleCancel = () => {
    // Close pop-up box
    setShowPopUp(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">FINtastic</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/add-objective" className="navbar-link">Add Objective</Link>
          </li>
        </ul>
      </nav>

      <div className="add-objective-container">
        <h2>Add New Objective</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {titleError && <span className="error">{titleError}</span>}
          <label>Timeframe:</label>
          <input type="date" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
          {timeframeError && <span className="error">{timeframeError}</span>}
          <button type="submit">Submit</button>
        </form>
        <Link to="/">Go back to Objectives</Link>
        
        {showPopUp && (
          <CustomPopUp
            message="Are you sure you want to submit this objective?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default AddObjective;
