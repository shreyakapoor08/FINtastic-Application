import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Spin, Select } from 'antd';

const { Option } = Select;

function renderEventContent(eventInfo) {
  let eventColor = '';
  switch (eventInfo.backgroundColor) {
    case 'green':
      eventColor = 'green';
      break;
    case 'blue':
      eventColor = 'blue';
      break;
    default:
      eventColor = 'black';
  }

  const eventStyle = {
    color: eventColor,
    backgroundColor: '#f0f0f0',
    padding: '8px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    maxHeight: '60px',
    overflow: 'auto'
  };

  return (
    <>
      <div style={eventStyle}>
        <i>{eventInfo.event.title}</i>
      </div>
    </>
  );
}

const CalendarComponent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const errorNotification = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "error"
    });
  };

  const headers = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const expensesRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense/getall`, { headers });
        const remindersRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reminder/getall`, { headers });

        if (expensesRes.data.isSuccess && remindersRes.data.isSuccess) {
          const expenseEvents = expensesRes.data.expenses.map(expense => ({
            title: expense.expenseName,
            start: expense.expenseDate,
            accessId: expense._id,
            type: 'expense',
            color: 'blue'
          }));

          const recurringEvents = [];
          remindersRes.data.reminders.forEach(reminder => {
            if (reminder.isReoccuring) {
              const recurrenceEndDate = moment().add(5, 'years');
              let currentDate = moment(reminder.date);
              while (currentDate.isBefore(recurrenceEndDate)) {
                recurringEvents.push({
                  title: reminder.reminderName,
                  start: currentDate.toISOString(),
                  accessId: reminder._id,
                  type: 'reminder',
                  color: 'green'
                });

                if (reminder.duration === 'monthly') {
                  currentDate.add(1, 'months');
                } else if (reminder.duration === 'yearly') {
                  currentDate.add(1, 'years');
                }
              }
            } else {
              recurringEvents.push({
                title: reminder.reminderName,
                start: reminder.date,
                accessId: reminder._id,
                type: 'reminder',
                color: 'green'
              });
            }
          });

          setEvents([...expenseEvents, ...recurringEvents]);
          console.log(events)
          setLoading(false);
        } else {
          throw new Error(expensesRes.data.message || remindersRes.data.message);
        }
      } catch (err) {
        errorNotification("Error", err.message);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    Swal.fire({
      title: 'Add Expense or Reminder',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Add Expense',
      confirmButtonColor: 'blue',
      cancelButtonText: 'Add Reminder',
      cancelButtonColor: 'green',
      showDenyButton: true,
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/addexpense', { state: { date: arg.dateStr } });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/addreminder', { state: { date: arg.dateStr } })
      }
    });
  };

  const handleEventClick = (clickInfo) => {
    const { accessId } = clickInfo.event.extendedProps;
    const { type } = clickInfo.event.extendedProps;
    if (type === 'expense') {
      navigate(`/viewexpense/${accessId}`);
    } else if (type === 'reminder') {
      navigate(`/viewreminder/${accessId}`);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          height="100vh"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
          }}
        />)}
    </div>
  );
};

export default CalendarComponent;
