import { useEffect } from "react";
import { io } from "socket.io-client";
import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// @ts-ignore
import Header from "../components/Header.tsx";

const ChatMessages = () => {
  return (
    <div
      style={{
        fontSize: "16px",
        wordBreak: "break-all",
        height: "420px",
        width: "330px",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <p>Sample message 1</p>
      <p>Sample message 2</p>
    </div>
  );
};

const ClientChatInterface = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";



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
      <Paper
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
        <ChatMessages />
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <OutlinedInput
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="send message"
                  color={isInputEmpty ? "default" : "primary"}
                  disabled={isInputEmpty}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </Paper>
    </div>
  );
};

export default ClientChatInterface;
