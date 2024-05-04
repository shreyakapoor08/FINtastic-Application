// Author -
// Ramandeep Kaur
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal for displaying SweetAlert notifications
import CustomPopUp from './CustomPopUp';
import '../css/AddObjective.css';
import { Link, useNavigate } from 'react-router-dom';

const AddObjective = () => {
  const [title, setTitle] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [timeframeError, setTimeframeError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/okr/objectives`, { title, timeframe });
        // Show SweetAlert success notification
        Swal.fire({
         
          icon: "success",
          title: "Objective has been saved!",
          showConfirmButton: false,
          timer: 1500
        });
        setShowPopUp(true);
        navigate('/okrhome');
      } catch (error) {
        setSubmitError('Failed to add objective. Please try again.');
        console.error('Error adding objective:', error);
      }
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
    setShowPopUp(false);
    setTitle('');
    setTimeframe('');
  };

  const handleCancel = () => {
    setShowPopUp(false);
  };

  return (
    <div>
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
        {submitError && <span className="error">{submitError}</span>}
        <Link to="/okrhome">Go back to Objectives</Link>
        
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
