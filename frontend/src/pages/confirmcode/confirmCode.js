// Author -
// Vishnu Vasita
import React, { useState } from "react";
import { Await, useNavigate  } from "react-router-dom";
import '../forgotpassword/forgotPassword.css';
import axios from "axios";
import Swal from "sweetalert2";

const ConfirmCode = () => {
  const navigate = useNavigate();
  const [tempKey, setTempKey] = useState("");
  const [errors, setErrors] = useState({});

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
        title: "wrong code entered",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
    })
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    
    if(!tempKey){
        newErrors.tempKey = "Please enter the temporary key provided in your mail."
    
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        let email = localStorage.getItem('userEmail');
        console.log(email);
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/confirmCode`, {
          email,
          tempKey
        })
        .then((response) => {
          console.log(response);
          successNotification("Code matched")
            navigate("/changepassword");
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
          <h1>Enter code</h1>
        </div>
     
     
        <div>
          <label>Code</label>
          <input
            type="string"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
          />
          <p style={{ color: 'red'}}>{errors.tempKey}</p>
        </div>
       
       
        <div className="button">
          <button className="submit_btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmCode;
