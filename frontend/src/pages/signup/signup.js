// Author -
// Vishnu Vasita
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[A-Za-z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*()_=-])(?=.*[A-Za-z0-9]).{8,}$/;
  const contactNoRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z]+$/;

  const checkFirstName = (value) => nameRegex.test(value);
  const checkLastName = (value) => nameRegex.test(value);
  const checkEmail = (value) => emailRegex.test(value);
  const checkContactNo = (value) => contactNoRegex.test(value);
  const checkPassword = (value) => passwordRegex.test(value);
  const checkConfirmPassword = (value) => password === value;
  const successNotification = (message) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Signup successful",
      showConfirmButton: false,
      timer: 1500
    });
  }
  const errorNotification = (message) => {
    Swal.fire({
      position: "center",
      title: message,
      color: "red",
      showConfirmButton: false,
      timer: 1500,
    });
}
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!checkFirstName(firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!checkLastName(lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (!checkEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!checkContactNo(contactNo)) {
      newErrors.contactNo = "Number should contain 10-digit";
    }

    if (!checkPassword(password)) {
      newErrors.password =
        "Password must contain special characters and minimum 8 letters";
    }

    if (!checkConfirmPassword(confirmPassword)) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          contactNo: contactNo,
          password: password,
        })
        .then((response) => {
          console.log(response);
          successNotification("Signed up successfully!")
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          let err_msg = error.response.data.message;
          errorNotification(err_msg)
        });
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="signup_comp">
      <form className="signup_container" onSubmit={handleSubmit}>
        <div>
          <h1>Create account</h1>
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.firstName}</p>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.lastName}</p>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>
        <div>
          <label>Contact No</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.contactNo}</p>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.password}</p>
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        </div>

        <div className="button">
          <button className="submit_btn" type="submit">
            Signup
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <span>
            Aleardy have an account?{" "}
            <a href="#" onClick={handleNavigate}>
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
