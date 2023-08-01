import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { UserChatInterface } from "../../components/chat_interface.tsx";
import { ConversationList } from "../../components/conversation_list.tsx";

export const AdminDashboard = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";


  const [conversationId, setConversationId] = useState<string | null>(null);
  const handleConversationSelection = (ID: string) => {
    setConversationId(ID);
  };
  const [conversationusername, setConversationUSername] = useState<string | null>(null);

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
          <ConversationList
            ConversationSelection={handleConversationSelection}
            setConversationUSername={setConversationUSername} conversationID={conversationId}/>
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
          {/* conversationID : {conversationId} */}
          <UserChatInterface conversationId={conversationId} conversationusername={conversationusername}/>
        </Grid>
      </Grid>
    </div>
  );
};
