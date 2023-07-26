import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// @ts-ignore
import Header from "../components/Header.tsx";
import { useParams } from "react-router-dom";
import Custon_Axios from "../../components/API/index.jsx";
import { ApiConstrains } from "../../components/API/ApiConstrains.jsx";

interface Message {
  _id: string;
  message: string;
}

const ChatMessages: React.FC<{ messages: Message[] }> = ({ messages }) => {
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
      {messages.map((message) => (
        <p key={message._id}>{message.message}</p>
      ))}
    </div>
  );
};

interface AdminModel {
  _id: string;
  fullName: string;
  role: string;
  email: string;
}

const ClientChatInterface: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [admins, setAdmins] = useState<AdminModel[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isInputEmpty = inputValue.trim() === "";

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await Custon_Axios.get(ApiConstrains.user.getadmin, {});
        const responseData: AdminModel[] = await res.data;
        setAdmins(responseData);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleStartConversation = async (adminId: string) => {
    try {
      const res = await Custon_Axios.post(ApiConstrains.StartConversation, {
        adminId,
        userId,
      });
      const responseData: { conversation: { _id: string } } = await res.data;
      console.log("Conversation started:", responseData);
      setSelectedAdminId(adminId);
      setConversationId(responseData.conversation._id); // Set the conversation ID from the response
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const addNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // const sendMessage = async () => {
  //   try {
  //     if (selectedAdminId && conversationId && inputValue.trim() !== "") {
  //       // Send a request to the API to send the message
  //       const res = await Custon_Axios.post(
  //         ApiConstrains.sendmassage(conversationId),
  //         {
  //           message: inputValue,
  //         }
  //       );

  //       // Handle the response, you can show a success message if needed
  //       const responseData: { message: Message } = await res.data;
  //       console.log("Message sent:", responseData);

  //       // Clear the input field after sending the message
  //       setInputValue("");

  //       // Add the new message to the messages state
  //       addNewMessage(responseData.message);
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     // You can show an error message to the user if needed
  //   }
  // };
  const sendMessage = async () => {
    try {
      if (selectedAdminId && conversationId && inputValue.trim() !== "") {
        // Send a request to the API to send the message
        const res = await Custon_Axios.post(
          ApiConstrains.sendmassage(conversationId),
          {
            userId: userId,
            message: inputValue,
          }
        );
  
        // Handle the response, you can show a success message if needed
        const responseData: { message: Message } = await res.data;
        console.log("Message sent:", responseData);
        console.log("Message sent:", userId);
  
        // Clear the input field after sending the message
        setInputValue("");
  
        // Add the new message to the messages state
        addNewMessage(responseData.message);
  
        // Emit the message to the server through Socket.IO
        socket?.emit("sendMessage", {
          conversationId,
          message: inputValue,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // You can show an error message to the user if needed
    }
  };
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedAdminId && conversationId) {
          const res = await Custon_Axios.get(
            ApiConstrains.GetMassages(conversationId)
          );
          const responseData: { messages: Message[] } = await res.data;
          setMessages(responseData.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedAdminId, conversationId]);

  useEffect(() => {
    // Initialize the Socket.IO client
    const socket = io("http://localhost:8080");
    setSocket(socket);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for incoming messages from the socket server
    if (socket) {
      socket.on("newMessage", (message: Message) => {
        addNewMessage(message);
      });
    }
  }, [socket]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isInputEmpty) {
      sendMessage();
    }
  };
  return (
    <>
      {/* Display user ID, conversation ID, and selected admin ID */}
      user ID : {userId} <br />
      conversation id: {conversationId} <br />
      selected admin id :{selectedAdminId}
      {/* Render the list of admins */}
      {admins.map((admin) => (
        <div key={admin._id}>
          <Button
            variant="outlined"
            onClick={() => handleStartConversation(admin._id)}
          >
            <span>start conversation with {admin.fullName}</span>
          </Button>
        </div>
      ))}
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
          <ChatMessages messages={messages} />
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
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
        </Paper>
      </div>
    </>
  );
};

export default ClientChatInterface;
