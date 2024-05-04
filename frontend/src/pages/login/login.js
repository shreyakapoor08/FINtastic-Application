// Author -
// Vishnu Vasita
import React, { useState } from "react";
import { Await, useNavigate  } from "react-router-dom";
import './login.css';
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const successNotification = (message) => {
    Swal.fire({
      title: "Logged in successful!",
      text: message,
      icon: "success",
      timer: 1000
      
    });
  }
  const errorNotification = (message) => {
    Swal.fire({
        title: "Log in Failed!",
        text: message,
        icon: "error",
        timer: 1000
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if(!email){
      newErrors.email = "please enter email"
    }

    if(!password){
      newErrors.password = "Please enter password"
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          successNotification(response.data.message)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id)
          navigate("/dashboard");
        })
        .catch(async(error) => {
            if(error.response){
               console.log(error.response.data.message);
               errorNotification(error.response.data.message)
            }else{
                console.log(error);
                errorNotification(error.message)
            }
        })
    }
  };

  
  const handleNavigate = () => {
    navigate('/signup');
  };


  const handleForgotNavigate = () =>{
    navigate('/forgotpassword');
  }

  return (
    <div className="login_comp">
      <form className="login_container" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
     
     
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.email}</p>
        </div>
       
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.password}</p>
       
        </div>
        <div style={{ textAlign: 'center' }}>
          <span ><a href="#" onClick={handleForgotNavigate}>forgot password?</a></span>
        </div>
     
        <div className="button">
          <button className="submit_btn" type="submit">Login</button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span >Don't have an account? <a href="#" onClick={handleNavigate}>Signup</a></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
