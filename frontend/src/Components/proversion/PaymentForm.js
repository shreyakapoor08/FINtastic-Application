// Author - 
// Shreya Kapoor

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handlePaymentSuccessClose = () => {
    setPaymentSuccessOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackbar(false);
  };

  const showSnackbar = (message) => {
    setErrorMessage(message);
    setErrorSnackbar(true);
  };

  const handleSubmit = () => {
    if (!email || !cardNumber || !expiry || !cvc || !cardholderName || !country || !zip) {
      showSnackbar('All fields are required. Please fill out the form completely.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar('Invalid email format. Please enter a valid email address.');
      return;
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      showSnackbar('Invalid card number. Please enter a valid 16-digit card number.');
      return;
    }

    setPaymentSuccessOpen(true);
  };

  const handleConfirmDialogClose = (confirmed) => {
    setConfirmDialogOpen(false);
    if (confirmed) {
      navigate('/subscription-plans');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="payment-form">
        <IconButton
          className="back-icon"
          onClick={() => setConfirmDialogOpen(true)}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="form-title">
          Payment Form
        </Typography>
        <TextField
          label="Email"
          fullWidth
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Card Number"
          fullWidth
          className="input-field"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="MM/YY"
              fullWidth
              className="input-field"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVC"
              fullWidth
              className="input-field"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          label="Cardholder Name"
          fullWidth
          className="input-field"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth className="input-field">
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="US">United States</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ZIP"
              fullWidth
              className="input-field"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="pay-now-button"
          onClick={handleSubmit}
        >
          Pay Now
        </Button>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={paymentSuccessOpen}
          autoHideDuration={6000}
          onClose={handlePaymentSuccessClose}
          message="Payment Successful! Thank you!"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handlePaymentSuccessClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={errorSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={errorMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <Dialog
          open={confirmDialogOpen}
          onClose={() => handleConfirmDialogClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Exit</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to exit the payment process?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmDialogClose(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleConfirmDialogClose(true)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default PaymentForm;
