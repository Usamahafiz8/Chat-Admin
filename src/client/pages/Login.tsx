import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Header from "../components/Header.tsx";
import Custom_Axios from "./../../components/API/index.jsx";
import { ApiConstrains } from "./../../components/API/ApiConstrains.jsx";

const ClientLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const validateEmail = (email: string) => {
    // Basic email validation (you can customize this based on your requirements)
    if (!email) {
      return "Email is required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email address.";
    }
    return "";
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Perform client-side validation
    const emailError = validateEmail(data.email);

    if (emailError) {
      setErrors({
        ...errors,
        email: emailError,
      });
      return;
    }

    const res = await Custom_Axios.post(ApiConstrains.user.registerOrLogin, {
      fullName: data.name,
      email: data.email,
    });

    if (res.status === 400) {
      alert("Invalid credentials");
    } else {
      const resData = res.data;
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        navigate("/user/Chat");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100wh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minHeight: "500px",
          width: "350px",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "24px",
            padding: "24px",
          }}
        >
          <h1
            style={{ fontWeight: 600, fontSize: "16px", color: "#1F2937" }}
          >
            Fill the form to start the chat
          </h1>
          <TextField
            style={{ backgroundColor: "White" }}
            label="Name"
            variant="outlined"
            fullWidth
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <TextField
            style={{ backgroundColor: "White" }}
            label="Email"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <Button
            variant="contained"
            fullWidth
            style={{
              background: "#EC5C2A",
              fontWeight: 600,
              fontSize: "16px",
            }}
            startIcon={<ChatOutlinedIcon />}
            onClick={handleLogin}
          >
            Start chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
