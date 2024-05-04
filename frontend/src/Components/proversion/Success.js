// Author - 
// Shreya Kapoor

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#009C96',
  color: 'white',
  '&:hover': {
    backgroundColor: '#008a84',
  },
});

const Success = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    setSessionId(storedSessionId);
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  const handlePaymentSuccess = () => {
    const token = localStorage.getItem('token');
    console.log('Token ------- ', token);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/payment-success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId: sessionId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        console.log('data.message:: ', data.message);
        navigate('/');
      })
      .catch((e) => {
        console.log('error is ', e);
      });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      flexDirection="column"
      style={{
        animation: fadeIn ? 'fadeIn 0.5s ease-in-out forwards' : 'none',
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        color="slate.700"
        mb={4}
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      >
        Payment Successful
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        color="black"
        mb={4}
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      >
        Welcome to the PRO version
      </Typography>
      <StyledButton
        variant="contained"
        size="large"
        onClick={handlePaymentSuccess}
        className="uppercase"
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      >
        Proceed
      </StyledButton>
    </Box>
  );
};

export default Success;

