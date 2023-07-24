import {
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#EC5C2A",
    },
  },
});
interface UserChatInterfaceProps {
  selectedUserId: string | null; // Receive the selected user ID as a prop
}

export const UserChatInterface = ({
  selectedUserId,
}: UserChatInterfaceProps) => {

  // chat personID => {selectedUserId}
  // getting admins ID here



  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([
    {
      userid: "123",
      message:
        "lorem ertyu jhg cvbnoiuy fg kjhf hioi iuhiu ghiu gi igiy gyu gyu fty fftyftyf tyf tf tuy  gugif yg kug iygu f yjg iugiy gigiy g iyhi",
    },
    {
      userid: "123",
      message: " yg kug iygu f yjg iugiy gigiy g iyhi",
    },

    // Add more messages here for different users (id 123 and 786)
  ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";
  const sendMessage = () => {
    if (!isInputEmpty) {
      setChat((prevChat) => [
        ...prevChat,
        {
          userid: "786", // Change the userid here for different users (id 123 and 786)
          message: inputValue,
        },
      ]);
      setInputValue("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isInputEmpty) {
      sendMessage();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "",
        }}
      >
        <div
          style={{
            height: "8vh",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            padding: "16px",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          John Doe {/* Display user name here */}
          {selectedUserId}
        </div>
        <div style={{ height: "82vh", overflowY: "scroll", padding: "16px" }}>
          {chat.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.userid === "123" ? "flex-start" : "flex-end",
                margin: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {message.userid === "123" ? (
                  <>
                    <Avatar style={{ backgroundColor: "#EC5C2A" }}>
                      <PersonIcon />
                    </Avatar>
                    <div
                      style={{
                        backgroundColor: "#F3F4F6",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        marginLeft: "8px",
                        maxWidth: "550px",
                      }}
                    >
                      {message.message}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        maxWidth: "550px",
                        backgroundColor: "#EC5C2A",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        marginRight: "8px",
                      }}
                    >
                      {message.message}
                    </div>
                    <Avatar style={{ backgroundColor: "#EC5C2A" }}>U</Avatar>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            height: "8vh",
            textAlign: "center",
            padding: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <OutlinedInput
            style={{ outlineColor: "#EC5C2A" }}
            color={"primary"}
            fullWidth
            placeholder="Type your message.."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // this line to handle Enter key press
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="send message"
                  color={isInputEmpty ? "default" : "primary"}
                  disabled={isInputEmpty}
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </div>
    </>
  );
};
