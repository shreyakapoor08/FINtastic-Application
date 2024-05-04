// Author -
// Shreya Kapoor
import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './Contactus.css';

const Contactus = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        email: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is not valid';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }
        setErrors(errors);
        // If there are errors, show Snackbar with error message
        if (Object.keys(errors).length > 0) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Please fill in all fields correctly');
            setOpenSnackbar(true);
        } else {
            // If no errors, submit the form
            setSnackbarSeverity('success');
            setSnackbarMessage('Form submitted successfully');
            setOpenSnackbar(true);
            setFormData({
                firstName: '',
                phoneNumber: '',
                email: '',
                message: ''
            });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
          <section id="showcase">
            <div className="text">
              <h2>Contact</h2>
            </div>
          </section>  
          <section id="get-in-touch">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{ marginBottom: '20px' }} 
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                sx={{ marginBottom: '20px' }} 
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ marginBottom: '20px' }} 
              />
              <TextField
                name="message"
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                sx={{ marginBottom: '20px' }} 
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="subscribe-button"
              >
                Send Message
              </Button>
            </form>
          </section>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      );
}

export default Contactus;
