import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/three-leaf-removebg-preview.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    // hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: undefined,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and ConfirmPassword should be same",
        toastifyOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username must be at least 3 characters long",
        toastifyOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters long or equal",
        toastifyOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastifyOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>Chatty</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  // background-color: #28312c;
  background-color: #398059;
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    img {
      height: 3.5rem;
    }
    h1 {
      // color: #02b34d;
      color: #80cb02;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #00170a;
    border-radius: 2rem;
    padding: 2rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem 1.5rem;
      border: 0.1rem solid #01612a;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      width: 100%;
      color: white;
      &:focus {
        border: 0.1rem solid #02b34d;
        outline: none;
      }
    }
    button {
      background: #145a32;
      padding: 1rem 2rem;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      border: none;
      font-weight: bold;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background: #02b34d;
      }
    }
    span {
      color: white;
      a {
        color: #02b34d;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
