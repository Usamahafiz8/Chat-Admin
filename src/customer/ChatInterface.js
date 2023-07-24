import React, { useState , useEffect} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";

const ChatInterface = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // const fetchChatMessages = async () => {
  //   try {
  //     // Replace "admin" with the ID of the admin (you can get it from the state or from the server)
  //     const adminId = "admin";
      
  //     // Make an API request to fetch the conversation between admin and selected user
  //     const conversationResponse = await axios.get(
  //       `http://localhost:8000/api/admin/messages/user/${selectedUser._id}`,
  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem("admin:token")}`,
  //         },
  //       }
  //     );
  
  //     const conversationId = conversationResponse.data.conversationId;
  
  //     // Make an API request to fetch all messages in the conversation
  //     const messagesResponse = await axios.get(
  //       `http://localhost:8000/api/admin/messages/${conversationId}`,
  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem("admin:token")}`,
  //         },
  //       }
  //     );
  
  //     // Set the fetched messages to the chatMessages state
  //     setChatMessages(messagesResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching chat messages:", error);
  //     // Handle any error that occurs during the API request
  //   }
  // };
  const fetchChatMessages = async () => {
    try {
      const adminId = "admin"; // Replace with the actual admin ID
  
      // Make an API request to fetch the conversation between admin and selected user
      const conversationResponse = await axios.get(
        `http://localhost:8000/api/admin/messages/user/${selectedUser._id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("admin:token")}`,
          },
        }
      );
  
      // Extract the conversation ID from the response data
      const conversationId = conversationResponse.data[0].conversationId;
  
      // Make an API request to fetch all messages in the conversation using the extracted conversationId
      const messagesResponse = await axios.get(
        `http://localhost:8000/api/admin/messages/${conversationId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("admin:token")}`,
          },
        }
      );
  
      // Set the fetched messages to the chatMessages state
      setChatMessages(messagesResponse.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      // Handle any error that occurs during the API request
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [selectedUser]);
  
  // Function to handle sending a message
  const handleSendMessage = async () => {
    try {
      if (!message.trim()) {
        return;
      }
  
      const response = await axios.post(
        "http://localhost:8000/api/admin/send-message-to-user",
        {
          userId: selectedUser._id,
          message,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("admin:token")}`,
          },
        }
      );
  
      const newMessage = {
        id: response.data.message.id,
        senderId: "admin", // Replace "admin" with the sender's ID (you can get the admin's ID from the state)
        receiverId: selectedUser._id,
        message: response.data.message.message,
        timestamp: response.data.message.timestamp,
      };
  
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle any error that occurs during the API request
    }
  };
  
  return (
    <Box>
      <Box>
        <Typography variant="h6">Chat with {selectedUser.fullName}</Typography>
        {chatMessages.map((msg) => (
          <Typography key={msg.id}>
            {msg.senderId === "admin" ? "You: " : `${selectedUser.fullName}: `}
            {msg.message}
            
          </Typography>
        ))}
      </Box>
      <Box>
        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginRight: "8px" }}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;
