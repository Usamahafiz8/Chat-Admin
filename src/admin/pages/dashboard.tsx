import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
// @ts-ignore
import { SelectUser } from "../components/SelectUser.tsx";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// @ts-ignore
import { UserChatInterface } from "../components/UserChatInterface.tsx";

export const AdminDashboard = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Handle the selected user ID (you can do this based on your use case)
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };
  return (
    <div style={{ padding: " 0 96px 0 96px", backgroundColor: "#F9FAFB" }}>
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          style={{
            background: "#ffffff",
            border: "1px solid #E5E7EB",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "36px",
            }}
          >
            <h1 style={{ fontWeight: 600, fontSize: 24 }}>Chat</h1>
            <OutlinedInput
              fullWidth
              placeholder="Search name"
              value={inputValue}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="send message"
                    color={isInputEmpty ? "default" : "primary"}
                    disabled={isInputEmpty}
                  >
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          {selectedUserId}
          <SelectUser
            selectedUserId={selectedUserId}
            onSelectUser={handleUserSelect}
          />
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          style={{
            border: "1px solid #E5E7EB",
            background: "#ffffff",
          }}
        >
          {selectedUserId}

          <UserChatInterface selectedUserId={selectedUserId} />
        </Grid>
      </Grid>
    </div>
  );
};
