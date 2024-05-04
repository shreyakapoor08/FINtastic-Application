import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";

const FetchExpensesComponent = () => {
  const [expenses, setExpenses] = useState([]); 
  const [loading, setLoading] = useState(true);

  const errorNotification = (message) => {
    Swal.fire({
      title: "Expenses did not retrieved!",
      text: message,
      icon: "error",
    });
  };

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };
        let res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/expense/getall`,
          { headers }
        );
        if (res.data.isSuccess) {
          setExpenses(res.data.expenses);
          setLoading(false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (err) {
        errorNotification(err.message);
      }
    };
    fetchAllExpenses();
  }, []);


  const CHATBOT_THEME = {
    botFontColor: "#4C4B42"
  };
  return (
    <div>
      {loading ? (
        <p>Fetching expenses...</p>
      ) : (
        <ThemeProvider theme={CHATBOT_THEME}>
            <Typography botFontColor fontFamily gutterBottom>
                Expense List
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {expenses.map((expense, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                    <Typography variant="body1">
                    <strong>Expense Name:</strong> {expense.expenseName},{" "}
                    <strong>Price:</strong> ${expense.expenseAmount}
                    </Typography>
                </li>
                ))}
            </ul>
        </ThemeProvider>
      )}
    </div>
  );
};

export default FetchExpensesComponent;
