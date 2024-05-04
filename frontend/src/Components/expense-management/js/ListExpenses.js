// Author -
// Bhargav Kanodiya
import React, { useState, useEffect } from 'react'
import './../css/ListExpenses.css'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
const ListExpenses = () => {
    const [expenses, setExpenses] = useState([])
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
                let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense/getall`, { headers });
                if (res.data.isSuccess) {
                    setExpenses(res.data.expenses)
                } else {
                    throw new Error(res.data.message);
                }
            } catch (err) {
                errorNotification(err.message);
            }
        }
        fetchAllExpenses()
    }, [])
    const handleClick = (expenseId) => {
        navigate(`/viewexpense/${expenseId}`);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filterByType, setFilterByType] = useState('');
    const [filterByCategory, setFilterByCategory] = useState('');
    const navigate = useNavigate();
    const filteredExpenses = expenses.filter(expense => {
        return (
            expense.expenseName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterByType === '' || expense.expenseType === filterByType) &&
            (filterByCategory === '' || expense.expenseCategory === filterByCategory)
        );
    });

    const sortedExpenses = filteredExpenses.sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.expenseDate) - new Date(a.expenseDate);
        } else if (sortBy === 'amount') {
            return b.expenseAmount - a.expenseAmount;
        } else {
            return new Date(b.expenseDate) - new Date(a.expenseDate);
        }
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setFilterByType(e.target.value);
    };

    const handleCategoryFilterChange = (e) => {
        setFilterByCategory(e.target.value);
    };
    const handleAddExpense=()=>{
        navigate('/addexpense')
    }

    return (
        <div className="expenses-container">
            <h1>My Expenses</h1>
            <div className="search-container">
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>
                <select value={filterByType} onChange={handleTypeFilterChange}>
                    <option value="">All Types</option>
                    <option value="paid">Paid</option>
                    <option value="received">Received</option>
                </select>
                <select value={filterByCategory} onChange={handleCategoryFilterChange}>
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
                <button onClick={handleAddExpense}>Add Expense</button>
            </div>
            {sortedExpenses.length === 0 ? (
                <p className="no-expense-message">You do not have any expenses right now.</p>
            ) : (
                <div className="expense-list">
                    <div className='expense-list-container'>
                        {sortedExpenses.map(expense => (
                            <div className={`expense-item ${expense.expenseType === 'paid' ? 'paid' : 'received'}`} key={expense._id} onClick={() => handleClick(expense._id)}>
                                <div>{expense.expenseName}</div>
                                <div>$ {expense.expenseAmount}</div>
                                <div>{expense.expenseType}</div>
                                <div>{new Date(expense.expenseDate).toLocaleDateString()}</div>
                                <div>{expense.expenseCategory}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
};

export default ListExpenses;