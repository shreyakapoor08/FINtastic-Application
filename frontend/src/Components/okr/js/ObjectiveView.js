// Author -
// Ramandeep Kaur
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../css/ObjectiveView.css'; // Import CSS file
import UpdateKR from './UpdateKR'; // Import UpdateKR component
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Button, TextField, Modal, Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slider } from '@mui/material';
import Swal from 'sweetalert2';
import { Divider } from 'antd';

const ObjectiveView = () => {
  const [objective, setObjective] = useState(null);
  const [newKeyResult, setNewKeyResult] = useState('');
  const [progress, setProgress] = useState(0); // State for progress slider
  const [overallProgress, setOverallProgress] = useState(0);
  const [showForm, setShowForm] = useState(false); // State to control new key result form visibility
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [updatedKeyResult, setUpdatedKeyResult] = useState({}); // State to store updated key result data
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editKeyResult, setEditKeyResult] = useState(null);
  const [deleteKeyResult, setDeleteKeyResult] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchObjective();
  }, []); 

  const fetchObjective = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/okr/objectives/${id}`);
      setObjective(response.data);
      console.log("Response data:"+JSON.stringify(response.data.keyResults, null, 2));

      // Calculate total progress from all key results
      let totalProgress = 0;
      response.data.keyResults.forEach(keyResult => {
        totalProgress += keyResult.progress;
      });
      const overallProgress = totalProgress / response.data.keyResults.length; // Calculate average progress
      setOverallProgress(overallProgress);

    } catch (error) {
      console.error('Error fetching objective', error);
    }
  };

  const handleAddKeyResult = async () => {
    try {
      // Ensures that the newKeyResult variable is not empty
      if (newKeyResult.trim() === '') {
        throw new Error('Key result title cannot be empty');
      }
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/okr/objectives/${id}/key-results`, { title: newKeyResult, progress });
      
      Swal.fire({
         
        icon: "success",
        title: "Key Result has been saved!",
        showConfirmButton: false,
        timer: 1500
      });
      // Refresh objective data after adding key result
      fetchObjective();
      // Clear input field and reset progress after adding key result
      setNewKeyResult('');
      setProgress(0);
      // Hide the new key result form after adding
      setShowForm(false);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding key result', error);
    }
  };

 
  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const handleEditKeyResult = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/okr/key-results/${editKeyResult._id}`, { title: editKeyResult.title, progress: editKeyResult.progress });
      
      Swal.fire({
         
        icon: "success",
        title: "Key Result has been saved!",
        showConfirmButton: false,
        timer: 1500
      });
      fetchObjective();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating key result', error);
    }
  };

  const handleDeleteKeyResult = async () => {
    try {

      let res=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/okr/key-results/${deleteKeyResult._id}`);
      if (res && res.status >= 200 && res.status < 300) {
        Swal.fire({
            title: 'Deleted Key result!',
            icon: 'success',
            text: "Key result deleted successfully.",
            confirmButtonColor: '#4c4b42',
            cancelButtonColor: '#6e6d66'
        });
    } else {
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to delete the item.',
            confirmButtonColor: '#4c4b42',
            cancelButtonColor: '#6e6d66'
        });
    }
    
      fetchObjective();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting key result', error);
    }
  };

  return (
    <div className="objective-container">
      {objective && (
        <>
          <div className="title-section">
            <h2>{objective.objective.title}</h2>
            <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>Add Key Result</Button>
          </div>

          <h3>Overall Progress</h3>
          <div className="progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${overallProgress}%`, background: 'rgb(76, 75, 66)' }}>
                <span style={{ fontSize: '15px' }}>{overallProgress.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <h3>Key Results</h3>
                <ul className="key-results">
                  {objective.keyResults && objective.keyResults.map((keyResult) => (
                    <ul key={keyResult._id}>
                    <div className="key-result">
                      <div>
                        <TrackChangesIcon />
                        <span className="key-result-text">{keyResult.title}</span>
                      
                    <EditIcon className="edit-icon" onClick={() => { setEditKeyResult(keyResult); setShowEditModal(true); }} />
                    <DeleteOutlineIcon className="delete-icon" onClick={() => {setDeleteKeyResult(keyResult); setShowDeleteModal(true);}} />
                  </div>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${keyResult.progress}%` }}>
                        {keyResult.progress}%
                      </div>
                    </div>
              <Divider />

                  </ul>
                  ))}
                </ul>
  {/* Add Key Result Modal */}
        <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '90%' }}>
              <Typography variant="h6" gutterBottom>Add Key Result</Typography>
              <TextField 
                placeholder="Key Result Value" 
                fullWidth 
                value={newKeyResult} 
                onChange={(e) => setNewKeyResult(e.target.value)} 
              />
              <Typography variant="h6" gutterBottom>Add Key Result Progress</Typography>
              <Slider
                value={progress}
                onChange={(e, value) => setProgress(value)}
                aria-labelledby="progress-slider"
                marks
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto" // Display the progress value beside the slider
              />
              <Button 
                onClick={handleAddKeyResult} 
                disabled={!newKeyResult.trim()} // Disable the button if the title is empty
              >
                Add
              </Button>

           
            </Box>
          </Modal>

          {/* Edit Key Result Modal */}
          <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '90%' }}>
            <Typography variant="h6" gutterBottom>Edit Key Result</Typography>
            <TextField 
              placeholder="Key Result Value" 
              fullWidth 
              value={editKeyResult?.title} 
              onChange={(e) => setEditKeyResult({ ...editKeyResult, title: e.target.value })} 
            />
            <Typography variant="h6" gutterBottom>Edit your Key Result's progress</Typography>
            <Slider
              value={editKeyResult?.progress || 0}
              onChange={(e, value) => setEditKeyResult({ ...editKeyResult, progress: value })}
              aria-labelledby="progress-slider"
              marks
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto" // Display the progress value beside the slider
            />
            <Button 
              onClick={handleEditKeyResult} 
              disabled={!editKeyResult?.title.trim()} // Disable the button if the title is empty
            >
              Save
            </Button>

            </Box>
          </Modal>

          {/* Delete Key Result Confirmation */}
          <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
            <DialogTitle>Delete Key Result</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete {deleteKeyResult?.title}?</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button onClick={handleDeleteKeyResult} color="error">Delete</Button>
            </DialogActions>
          </Dialog>

          <Link to="/okrhome" className="back-link">Back to Home</Link>
          {showPopup && (
            <UpdateKR
              message="Update Key Result"
              onConfirm={handleEditKeyResult}
              onCancel={closeUpdatePopup}
              onClose={closeUpdatePopup}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ObjectiveView;
