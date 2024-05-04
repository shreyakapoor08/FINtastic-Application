import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment, Button } from "semantic-ui-react";
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import { ThemeProvider } from "styled-components";
import Swal from "sweetalert2";
import FetchExpensesComponent from "../chat/FetchExpenseComponent";

const CHATBOT_THEME = {
  background: "#FFFEFC",
  headerBgColor: "#4C4B42",
  headerFontColor: "#FFFFFF",
  headerFontSize: "11px",
  botBubbleColor: "#e9e7dd",
  botFontColor: "#4C4B42",
  userBubbleColor: "#FFBFB5",
  userFontColor: "#4C4B42"
};

const StyledButton = styled(Button)({
  backgroundColor: "#4C4B42",
  color: "white",
  padding: "10px 15px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e9e7dd",
    color: "#4C4B42"
  },
});

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [expenses, setExpenses] = useState([]); 
  const errorNotification = (message) => {
    Swal.fire({
      title: "Expenses did not retireved!",
      text: message,
      icon: "error"
    })
  }
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to our FINtastic. How can I assist you today?',
      trigger: 'Options'
    },
    {
      id: 'Options',
      options: [
        { value: 'expenses', label: 'View Expenses', trigger: 'FetchExpenses' },
        { value: 'ticket', label: 'Generate Ticket', trigger: 'GenerateTicket' },
        { value: 'exit', label: 'Exit Chat', trigger: 'EndChat' } 
      ]
    },
    {
      id: 'FetchExpenses',
      component: <FetchExpensesComponent />,
      trigger: 'Options' 
    },
    {
      id: 'GenerateTicket',
      message: 'Please provide a brief description of your issue to generate a ticket.',
      trigger: 'WaitingForIssueDescription'
    },
    {
      id: 'WaitingForIssueDescription',
      user: true,
      trigger: 'TicketGenerated'
    },
    {
      id: 'TicketGenerated',
      message: 'Thank you. Your ticket has been generated. Our support team will contact you shortly.',
      trigger: 'Options' 
    },
    {
      id: 'EndChat',
      message: 'Thank you for using FINtastic. Have a great day!',
      end: true
    }
  ];
  

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      <StyledButton onClick={toggleChat}>
        {showChat ? <ChatIcon /> : <ChatIcon />}
      </StyledButton>
      <Segment style={{ display: showChat ? "block" : "none", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "5px", marginTop: "20px" }}>
        <ThemeProvider theme={CHATBOT_THEME}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      </Segment>
    </div>
  );
};

export default Chatbot;
