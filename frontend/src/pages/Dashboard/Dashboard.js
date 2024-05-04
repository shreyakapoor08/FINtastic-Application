import React, { useState, useEffect } from "react";
import VerifiedIcon from '@mui/icons-material/Verified';
import axios from "axios";
import ExpenseSummary from "../../Components/Dashboard/ExpenseSummary";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (token) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.user);
        if (!response.data.user.isSubscribed) {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    } else {
      setShowModal(true);
    }

    // Add event listener to close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (event.target === document.querySelector('.modal')) {
        setShowModal(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {user && (
        <div className="user-details">
        <h2>Hi, {user.firstName} {user.lastName} {user.isSubscribed && <VerifiedIcon />}</h2>
        </div>
      )}

    <ExpenseSummary/>
{/* 
    <div className="calendar-container">
        <CalendarComponent />
      </div> */}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-icon" onClick={() => setShowModal(false)}>✖</span>
            <p>Please subscribe to get the latest features from Fintastic</p>
            <button className="subscribe-button" onClick={() => window.location.href = '/subscription-plans'}>Subscribe Now!!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
