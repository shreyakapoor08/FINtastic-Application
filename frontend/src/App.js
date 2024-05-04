import { Route, Routes, Navigate } from "react-router-dom";
import AddExpense from "./Components/expense-management/js/AddExpense";
import ListExpenses from "./Components/expense-management/js/ListExpenses";
import ViewExpense from "./Components/expense-management/js/ViewExpense";
import EditExpense from "./Components/expense-management/js/EditExpense";
import './App.css';
import Chat from './Components/chat/Chatbot';
import Home from './Components/Home';
import AddObjective from './Components/AddObjective';
import BasicPie from './Components/budget-planner/budget-planner';
import Navbar from './Components/navbar/navbar';
import WhatsNew from './Components/proversion/WhatsNew';
import SubscriptionPlans from './Components/proversion/SubscriptionPlans';
import PaymentForm from './Components/proversion/PaymentForm';
import Contactus from './Components/contactus/Contactus';
import Faq from './Components/faq/Faq';
import LandingPage from "./Components/landing/LandingPage";

// okr
import OkrHome from './Components/okr/js/Home';
import AddOkr from './Components/okr/js/AddObjective';
import ObjectiveView from './Components/okr/js/ObjectiveView';

import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Profile from "./pages/profile/userProfile";
import ForgotPassword from "./pages/forgotpassword/forgotPassword";
import ConfirmCode from "./pages/confirmcode/confirmCode";
import ChangePassword from "./pages/changepassword/changepassword";

import CalendarComponent from "./Components/Calendar/js/CalendarComponent";
import AddReminder from "./Components/Reminders/js/AddReminder";
import ViewReminder from "./Components/Reminders/js/ViewReminder";
import EditReminder from "./Components/Reminders/js/EditReminder";
import ListReminders from "./Components/Reminders/js/ListReminders";

import Success from './Components/proversion/Success';
import Cancel from './Components/proversion/Cancel';
import AddDocumentForm from "./Components/document-upload/addDocument";
import ViewDocuments from "./Components/document-upload/viewDocument";

import Dashboard from "./pages/Dashboard/Dashboard"
import { useEffect, useState } from "react";
import { Spin } from 'antd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setLoading(false)
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Navbar />
          {isLoggedIn && <Chat />}
          <Routes>
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/home" replace />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/confirmcode" exact element={<ConfirmCode />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/home" replace />} />
            <Route
              path="/listexpenses/"
              element={isLoggedIn ? <ListExpenses /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/addexpense"
              element={isLoggedIn ? <AddExpense /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/viewexpense/:expenseId"
              element={isLoggedIn ? <ViewExpense /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/editexpense/:expenseId"
              element={isLoggedIn ? <EditExpense /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/listreminders"
              element={isLoggedIn ? <ListReminders /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/addreminder"
              element={isLoggedIn ? <AddReminder /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/viewreminder/:reminderId"
              element={isLoggedIn ? <ViewReminder /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/editreminder/:reminderId"
              element={isLoggedIn ? <EditReminder /> : <Navigate to="/home" replace />}
            />
            <Route path="/chat" element={<Chat />} />
            <Route path="/okr" element={isLoggedIn ? <Home /> : <Navigate to="/home" replace />} />
            <Route
              path="/add-objective"
              element={isLoggedIn ? <AddObjective /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/budget-planner"
              element={isLoggedIn ? <BasicPie /> : <Navigate to="/home" replace />}
            />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/whatsnew" element={<WhatsNew />} />
            <Route
              path="/subscription-plans"
              element={isLoggedIn ? <SubscriptionPlans /> : <Navigate to="/home" replace />}
            />
            <Route path="/checkout" element={isLoggedIn ? <PaymentForm /> : <Navigate to="/home" replace />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/calendar" element={isLoggedIn ? <CalendarComponent /> : <Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />



            {/* okr */}
            <Route path="/okrhome" element={isLoggedIn ? <OkrHome /> : <Navigate to="/home" replace />} />
            <Route path="/add-okr" element={isLoggedIn ? <AddOkr /> : <Navigate to="/home" replace />} />
            <Route path="/objective-view/:id" element={isLoggedIn ? <ObjectiveView /> : <Navigate to="/home" replace />} />

            <Route path="/success" element={isLoggedIn ? <Success /> : <Navigate to="/home" replace />} />
            <Route path="/cancel" element={isLoggedIn ? <Cancel /> : <Navigate to="/home" replace />} />
            <Route
              path="/addDocument"
              element={isLoggedIn ? <AddDocumentForm /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/viewDocuments"
              element={isLoggedIn ? <ViewDocuments /> : <Navigate to="/home" replace />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
