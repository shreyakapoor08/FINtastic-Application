//Author
//Jaskaran Singh
import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function DynamicPieChart() {
  const navigate = useNavigate();

  const [chartData, setChartData] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, config)
      .then((response) => {
        console.log(response);
        const userMonthlySalary = response.data.user.income;
        setMonthlySalary(userMonthlySalary);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  useEffect(() => {
    if ((!isLoading && monthlySalary === "") || (!isLoading && !monthlySalary)) {
      errorNotification(
        "Monthly salary not set",
        "Enter your income in profile before using this feature"
      );
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [isLoading, monthlySalary, navigate]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!isLoading && monthlySalary !== "") {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/budget/all`, config)
        .then((response) => {
          const fetchedChartData = response.data.budgetData;
          if (fetchedChartData.length === 0) {
            errorNotification(
              "No Data Found",
              "No Data Found"
            );
          } else {
            setChartData(fetchedChartData);
          }
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
        });
    }
  }, [isLoading, monthlySalary]);

  const errorNotification = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",
    });
  };

  const successNotification = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
    });
  };

  const addChartData = (newData) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/budget/add`,
        { newData, userId },
        config
      )
      .then((response) => {
        console.log("New data added successfully:", response.data);
        successNotification("Success", "New data added successfully");
      })
      .catch((error) => {
        console.error("Error adding new data:", error);
        errorNotification("Error", "Failed to add new data");
      });
  };

  const handleAddData = () => {
    if (!newLabel || !newValue) {
      errorNotification(
        "Input Error",
        "Please enter both category and Percentage."
      );
      return;
    }

    const newId = chartData.length;
    const newData = { id: newId, value: parseInt(newValue), label: newLabel };

    setChartData((prevData) => [...prevData, newData]);
    addChartData(newData);
    setNewLabel("");
    setNewValue("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewLabel(chartData[index].label);
    setNewValue(chartData[index].value.toString());
  };

  const handleUpdate = (id) => {
    if (!newLabel || !newValue) {
      errorNotification(
        "Input Error",
        "Please enter both category and Percentage."
      );
      return;
    }

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedData = {
      newData: { value: parseInt(newValue), label: newLabel },
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/budget/${id}`,
        updatedData,
        config
      )
      .then((response) => {
        if (response.data.success) {
          successNotification("Success", "Budget data updated successfully");
          setChartData((prevData) => {
            const updatedChartData = [...prevData];
            const dataIndex = updatedChartData.findIndex(item => item._id === id);
            updatedChartData[dataIndex].label = newLabel;
            updatedChartData[dataIndex].value = parseInt(newValue);
            return updatedChartData;
          });
        } else {
          console.error(
            "Failed to update budget data:",
            response.data.message
          );
          errorNotification("Error", "Failed to update budget data");
        }
      })
      .catch((error) => {
        console.error("Error updating budget data:", error);
        errorNotification("Error", "Failed to update budget data");
      });

    setEditIndex(null);
    setNewLabel("");
    setNewValue("");
  };

  const handleDelete = (id) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/budget/${id}`, config)
      .then((response) => {
        if (response.data.success) {
          setChartData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );
          successNotification("Success", "Budget data deleted successfully");
        } else {
          console.error(
            "Failed to delete budget item:",
            response.data.message
          );
          errorNotification("Error", "Failed to delete budget data");
        }
      })
      .catch((error) => {
        console.error("Error deleting budget item:", error);
        errorNotification("Error", "Failed to delete budget data");
      });
  };

  return (
    <Stack spacing={2} marginTop={2} marginLeft={2}>
      <Typography variant="h4">Monthly Budget Planner</Typography>
      <Typography variant="h6">
        Your Monthly income is ${monthlySalary}
      </Typography>
      <Stack spacing={2} alignItems="center">
        <Stack spacing={2} direction="row" alignItems="center">
          <TextField
            label="Category"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Percentage"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            type="number"
            style={{ marginRight: "10px" }}
          />
          {editIndex !== null ? (
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "10px",
                bgcolor: "#4c4b42",
                "&:hover": { bgcolor: "#3a3932" },
              }}
              onClick={() => handleUpdate(chartData[editIndex]._id)}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddData}
              sx={{
                marginTop: "10px",
                bgcolor: "#4c4b42",
                "&:hover": { bgcolor: "#3a3932" },
              }}
            >
              Add Category
            </Button>
          )}
        </Stack>
        <PieChart
          series={[{ data: chartData }]}
          width={500}
          height={230}
          labelAccessor={({ dataEntry }) => `${dataEntry.value}%`}
        />
      </Stack>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {chartData.map((category, index) => (
            <Card
              key={category.id}
              style={{
                marginRight: "30px",
                marginBottom: "10px",
                width: "23%",
              }}
            >
              <CardContent>
                <Typography variant="h6">{category.label}</Typography>
                <Typography>
                  Budget: {category.value}% equals to $
                  {(category.value / 100) * monthlySalary}
                </Typography>
                <IconButton onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(category._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
