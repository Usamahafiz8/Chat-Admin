import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignInPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      setMessage("Please provide full name and email.");
      return;
    }

    try {
      // User registration or login
      const response = await axios.post("http://localhost:8000/api/user/register-or-login", {
        fullName,
        email,
      });

      // Get the user ID and token from the response
      const userId = response.data.user._id;
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Start a conversation with the admin
      Navigate(`/user/chat/${userId}`);
      setMessage("Conversation with admin started successfully.");
    } catch (error) {
      setMessage("Error: " + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">{isSignInPage ? "Login" : "Register"}</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default Form;
