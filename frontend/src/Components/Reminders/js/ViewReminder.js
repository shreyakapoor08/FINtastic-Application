// Author -
// Bhargav Kanodiya
import React, { useEffect, useState } from 'react';
import './../css/ViewReminder.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
const ViewReminder = () => {
    const [reminder, setReminder] = useState({});
    const { reminderId } = useParams();
    const navigate = useNavigate();
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
    }
    const errorNotification = (message) => {
        Swal.fire({
            title: "Reminder did not retireved!",
            text: message,
            icon: "error"
        })
    }
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reminder/get/${reminderId}`, { headers });
                if (res.data.isSuccess) {
                    if(res.data.reminder.isReoccuring){
                        res.data.reminder.occurrence='reoccuring'
                    } else {
                        res.data.reminder.occurrence='onetime'
                    }
                    setReminder(res.data.reminder)
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                errorNotification(err.message);
            }
        }
        fetchExpense()
    }, [])
    const handleUpdate = () => {
        navigate(`/editreminder/${reminder._id}`)
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#4c4b42",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        });

        if (result.isConfirmed) {
            try {
                let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/expense/reminder/${reminderId}`, { headers });
                if (res.data.isSuccess) {
                    Swal.fire({
                        title: 'Deleted!',
                        icon: 'success',
                        message: res.data.message,
                        confirmButtonColor: '#4c4b42',
                        cancelButtonColor: '#6e6d66'
                    });
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                Swal.fire({
                    title: "Expense did not delete!",
                    text: err.message,
                    icon: "error"
                })
            }
        } else {
            Swal.fire({ title: 'Cancelled!', icon: 'error', confirmButtonColor: '#4c4b42' });
        }
    };



    return (
        <div className="view-reminder-container">
            <h2 className="reminder-title">Reminder Details</h2>
            <div className="reminder-details">
                <p><strong>Reminder Name:</strong> {reminder.reminderName}</p>
                <p><strong>Expense Type:</strong> {reminder.expenseType}</p>
                <p><strong>occurrence:</strong> {reminder.occurrence}</p>
                {reminder.duration && (
                    <p><strong>occurrence Duration:</strong> {reminder.duration}</p>
                )}
                <p><strong>Category:</strong> {reminder.expenseCategory}</p>
            </div>
            <div className="buttons-container">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ViewReminder;
