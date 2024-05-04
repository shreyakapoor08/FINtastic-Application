// Author -
// Vishnu Vasita
import React, { useState } from "react";
import { Await, useNavigate  } from "react-router-dom";
import './forgotPassword.css';
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const successNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }
  const errorNotification = () => {
    Swal.fire({
        title: "email not registered",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if(!email){
      newErrors.email = "please enter email"
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/forgotpassword`, {
          email: email,
         
        })
        .then((response) => {
          console.log(response);
          successNotification(response.data.message)
          localStorage.setItem('userEmail', email);
        navigate("/confirmcode");
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

  
  return (
    <div className="forgotpassword_comp">
      <form className="forgotpassword_container" onSubmit={handleSubmit}>
        <div>
          <h1>Forgot password</h1>
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
       
       
        <div className="button">
          <button className="submit_btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
