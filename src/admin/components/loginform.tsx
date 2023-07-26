import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Custom_Axios from "../../components/API";
import { ApiConstrains } from "../../components/API/ApiConstrains";
// @ts-ignore
// import Custon_Axios from "../../components/API.tsx";
// @ts-ignore
// import {ApiConstrains} from '../../components/API/ApiConstrains'

export const AdminLoginForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    // Basic email validation (you can customize this based on your requirements)
    if (!email) {
      return "Email is required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    // Basic password validation (you can customize this based on your requirements)
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }
    const res = await Custom_Axios.post(ApiConstrains.admin.login, {
      email: data.email,
      password: data.password,
    });
    if (res.status === 400) {
      alert("Invalid credentials");
    } else {
      const resData = res.data;
      if (resData.token) {
        localStorage.setItem("admin:token", resData.token);
        const ID = resData.adminId;
        console.log(ID);
        navigate(`/admin/dashboard/${ID}`);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "395px",
        gap: "32px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "32px", fontWeight: 700, textAlign: "center" }}>
          Login to your account
        </h1>
        <h3 style={{ fontSize: "16px", fontWeight: 400, textAlign: "center" }}>
          Please login to get access to the dashboard.
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          fullWidth
          variant="contained"
          style={{ fontWeight: 600, height: "48px", fontSize: "16px" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
