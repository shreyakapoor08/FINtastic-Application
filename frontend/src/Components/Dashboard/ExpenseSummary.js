import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Paper } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";

const ExpenseSummary = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expense/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data.expenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  const calculateWeeklyTotal = () => {
    // Calculate total spent and received in a week
    const currentDate = new Date();
    const weekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const weekEndDate = new Date(
      weekStartDate.getFullYear(),
      weekStartDate.getMonth(),
      weekStartDate.getDate() + 6
    );

    const weeklyExpenses = expenses.filter(
      (expense) =>
        new Date(expense.expenseDate) >= weekStartDate &&
        new Date(expense.expenseDate) <= weekEndDate
    );
    const totalSpent = weeklyExpenses.reduce(
      (acc, expense) => (expense.expenseType === "paid" ? acc + expense.expenseAmount : acc),
      0
    );
    return totalSpent;
  };

  const calculateWeeklyReceived = () => {
    // Calculate total received in a week
    const currentDate = new Date();
    const weekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const weekEndDate = new Date(
      weekStartDate.getFullYear(),
      weekStartDate.getMonth(),
      weekStartDate.getDate() + 6
    );

    const weeklyExpenses = expenses.filter(
      (expense) =>
        new Date(expense.expenseDate) >= weekStartDate &&
        new Date(expense.expenseDate) <= weekEndDate
    );
    const totalReceived = weeklyExpenses.reduce(
      (acc, expense) => (expense.expenseType === "received" ? acc + expense.expenseAmount : acc),
      0
    );
    return totalReceived;
  };

  const calculateMonthlyTotal = () => {
    // Calculate total spent and received in a month
    const currentDate = new Date();
    const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthlyExpenses = expenses.filter(
      (expense) =>
        new Date(expense.expenseDate) >= monthStartDate &&
        new Date(expense.expenseDate) <= monthEndDate
    );
    const totalSpent = monthlyExpenses.reduce(
      (acc, expense) => (expense.expenseType === "paid" ? acc + expense.expenseAmount : acc),
      0
    );
    return totalSpent;
  };

  const calculateMonthlyReceived = () => {
    // Calculate total received in a month
    const currentDate = new Date();
    const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthlyExpenses = expenses.filter(
      (expense) =>
        new Date(expense.expenseDate) >= monthStartDate &&
        new Date(expense.expenseDate) <= monthEndDate
    );
    const totalReceived = monthlyExpenses.reduce(
      (acc, expense) => (expense.expenseType === "received" ? acc + expense.expenseAmount : acc),
      0
    );
    return totalReceived;
  };

  const generateChartData = () => {
    // Generate data for the pie chart
    const categoryData = expenses.reduce((acc, expense) => {
      if (!acc[expense.expenseCategory]) {
        acc[expense.expenseCategory] = 0;
      }
      acc[expense.expenseCategory] += expense.expenseAmount;
      return acc;
    }, {});

    const data = Object.keys(categoryData).map((category) => ({
      title: category,
      value: categoryData[category],
      color: getRandomColor(),
    }));

    return data;
  };

  const getRandomColor = () => {
    // Generate a random color for the pie chart
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper style={{ padding: 8, textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}>
            <Typography variant="h6">Weekly Expenditure</Typography>
            <Typography>Total Spent: {calculateWeeklyTotal()}</Typography>
            <Typography>Total Received: {calculateWeeklyReceived()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 8, textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}>
            <Typography variant="h6">Monthly Expenditure</Typography>
            <Typography>Total Spent: {calculateMonthlyTotal()}</Typography>
            <Typography>Total Received: {calculateMonthlyReceived()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1, marginRight: 16 }}>
                <Typography variant="h6">Categories:</Typography>
                {generateChartData().map((entry, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <span>{`${entry.title}: ${entry.value}`}</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <PieChart
                  data={generateChartData()}
                  lineWidth={30}
                  animate={true}
                  animationDuration={500}
                  label={false}
                  labelStyle={(index) => ({
                    fontSize: "10px",
                    fill: "black",
                  })}
                />
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};

export default ExpenseSummary;