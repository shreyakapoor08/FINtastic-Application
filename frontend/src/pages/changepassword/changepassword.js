// Author -
// Vishnu Vasita
import React, { useState } from "react";
import {  useNavigate  } from "react-router-dom";
import '../forgotpassword/forgotPassword.css';
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const passwordRegex = /^(?=.*[!@#$%^&*()_=-])(?=.*[A-Za-z0-9]).{8,}$/;

  const checkPassword = (value) => passwordRegex.test(value);

  const successNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }
  const errorNotification = () => {
    Swal.fire({
        title: "Error changing password",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    
    if(!password){
        newErrors.password = "Please enter the password."
    
    }

    if(!checkPassword(password)){
      newErrors.password = "Password must contain special characters and minimum 8 letters "
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        let email = localStorage.getItem("userEmail");
        console.log(email);
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/user/changepassword`, {
          email,
          password
        })
        .then((response) => {
          console.log(response);
          successNotification("password update successful");
          localStorage.removeItem("userEmail")
          navigate("/login");
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
          <h1>Enter new password</h1>
        </div>
     
     
        <div>
          <label>Password</label>
          <input
            type="string"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.password}</p>
        </div>
       
       
        <div className="button">
          <button className="submit_btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
