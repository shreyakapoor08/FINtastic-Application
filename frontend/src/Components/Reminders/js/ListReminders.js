// Author -
// Bhargav Kanodiya
import React, { useState, useEffect } from 'react'
import './../css/ListReminders.css'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
const ListReminders = () => {
    const [reminders, setReminders] = useState([])
    const errorNotification = (message) => {
        Swal.fire({
            title: "Expenses did not retireved!",
            text: message,
            icon: "error"
        })
    }
    useEffect(() => {
        const fetchAllExpenses = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
                let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reminder/getall`, { headers });
                if (res.data.isSuccess) {
                    setReminders(res.data.reminders)
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                errorNotification(err.message);
            }
        }
        fetchAllExpenses()
    }, [])
    const handleClick = (reminderId) => {
        navigate(`/viewreminder/${reminderId}`);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByType, setFilterByType] = useState('');
    const [filterByCategory, setFilterByCategory] = useState('');
    const [filterByReoccuring, setFilterByReoccuring] = useState('');
    const [filterByDuration, setFilterByDuration] = useState('');
    const navigate = useNavigate();
    const filteredReminders = reminders.filter(reminder => {
        return (
            reminder.reminderName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterByType === '' || reminder.expenseType === filterByType) &&
            (filterByCategory === '' || reminder.expenseCategory === filterByCategory) &&
            (filterByReoccuring === '' || reminder.isReoccuring.toString() === filterByReoccuring) &&
            (!reminder.isReoccuring || filterByDuration === '' || reminder.duration === filterByDuration)
        );
    });
    const handleAddReminder=()=>{
        navigate('/addreminder');
    }

    return (
        <div className="reminder-container">
            <h1>My Reminders</h1>
            <div className="search-container">
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select value={filterByType} onChange={(e) => setFilterByType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="paid">Paid</option>
                    <option value="received">Received</option>
                </select>
                <select value={filterByCategory} onChange={(e) => setFilterByCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="grocery">Grocery</option>
                    <option value="car">Car</option>
                    <option value="rent">Rent</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="insurance">Insurance</option>
                    <option value="travel">Travel</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                </select>
                <select value={filterByReoccuring} onChange={(e) => setFilterByReoccuring(e.target.value)}>
                    <option value="">All Reoccuring</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                {filterByReoccuring === 'true' && (
                    <select value={filterByDuration} onChange={(e) => setFilterByDuration(e.target.value)}>
                        <option value="">All Durations</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                )}
                <button onClick={handleAddReminder}>Add Reminder</button>
            </div>
            {filteredReminders.length === 0 ? (
                <p className="no-reminder-message">You do not have any Reminders right now.</p>
            ) : (
                <div className="reminder-list">
                    <div className='reminder-list-container'>
                        {filteredReminders.map(reminder => (
                            <div className={`reminder-item ${reminder.expenseType === 'paid' ? 'paid' : 'received'}`} key={reminder._id} onClick={() => handleClick(reminder._id)}>
                                <div>{reminder.reminderName}</div>
                                <div>{reminder.expenseType}</div>
                                <div>{new Date(reminder.date).toLocaleDateString()}</div>
                                <div>{reminder.expenseCategory}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
};

export default ListReminders;