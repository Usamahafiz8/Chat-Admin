import {
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import Custon_Axios from "../../components/API";
import { ApiConstrains } from "../../components/API/ApiConstrains";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";


interface Message {
  _id: string;
  senderId: string;
  message: string;
}

interface UserChatInterfaceProps {
  conversationId: string | null; // Receive the selected conversation ID as a prop
}

export const UserChatInterface = ({
  conversationId,
}: UserChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const { AdminID } = useParams<{ AdminID: string }>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";

  const adminId = AdminID!;

  const sendMessage = async () => {
    if (!isInputEmpty && conversationId) {
      try {
        const newMessage: Message = {
          _id: "temp-" + Date.now(),
          senderId: adminId,
          message: inputValue,
        };
        setChat((prevChat) => [...prevChat, newMessage]);
        setInputValue("");
  
        // Send the message to the server through Axios
        const res = await Custon_Axios.post(
          ApiConstrains.sendmassage(conversationId),
          {
            message: inputValue,
            senderId: adminId, // Include the sender ID in the request payload
          }
        );
  
        const responseData: { message: Message, senderID: Message } = await res.data;
        console.log("Message sent:", responseData);
  
        // Send the message to the server through Socket.IO
        socket.emit("sendMessage", {
          conversationId,
          senderId: adminId,
          message: inputValue,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isInputEmpty) {
      sendMessage();
    }
  };

  // Socket.IO connection
  const socket: Socket = io("http://localhost:8080");

  useEffect(() => {
    // Listen for incoming messages from the socket server
    socket.on("getMessage", (data: any) => {
      const { senderId, message } = data;
      const newMessage: Message = {
        _id: "temp-" + Date.now(), // Temporary ID until the server responds with the actual ID
        senderId: senderId,
        message,
      };
      setChat((prevChat) => [...prevChat, newMessage]);
    });

    // Fetch initial messages and join the conversation room
    const fetchMessages = async () => {
      try {
        if (conversationId) {
          // Join the conversation room
          socket.emit("joinConversation", conversationId);

          const res = await Custon_Axios.get<{ messages: Message[] }>(
            ApiConstrains.GetMassages(conversationId),
            {
              headers: {
                Authorization: `${localStorage.getItem("admin:token")}`,
              },
            }

            );
            // const data = res.data;
            // const massa = data.messages
            // console.log(massa.senderId);

          if (res.status === 200) {
            const responseData = res.data;
            setChat(responseData.messages);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Clean up socket.io subscription on component unmount
    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  return (
    <>
       <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Add this to place the latest message at the bottom
          height: "100vh", // Change this to 100vh to make the chat UI fill the viewport
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
          {conversationId}
        </div>
        <div
          style={{
            flex: 1, // Allow the chat messages to take remaining vertical space
            overflowY: "scroll",
            padding: "16px",
          }}
        >
          {chat.map((message) => (
            <div
              key={message._id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.senderId === adminId ? "flex-end" : "flex-start", // Change the alignment based on the user ID
                margin: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {message.senderId === adminId ? (
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
                ) : (
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
    </>
  );
};
