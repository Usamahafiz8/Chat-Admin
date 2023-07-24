import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserChat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [availableAdmins, setAvailableAdmins] = useState([]);

  useEffect(() => {
    fetchUserChat();
    fetchAvailableAdmins();
  }, [userId]);

  const fetchUserChat = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/messages/user/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching user chat:", error);
    }
  };

  const fetchAvailableAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/available-admins");
      setAvailableAdmins(response.data.availableAdmins);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching available admins:", error);
    }
  };

  const handleStartConversation = async (adminId) => {
    if (!adminId) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/user/start-conversation", {
        userId: userId,
        adminId: adminId,
      });

      // Optionally, you can update the state or show a success message
      console.log("Conversation started with admin");
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!newMessage.trim()) {
        return; // Don't send empty messages
      }

      const response = await axios.post("http://localhost:8000/api/admin/send-message", {
        senderId: userId,
        receiverId: "admin", // Assuming admin user ID is "admin"
        message: newMessage,
      });

      // Update the state to display the sent message immediately (optional)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          _id: response.data.message._id, // Assuming the response contains the new message with _id
          sender: userId,
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Clear the newMessage input after sending the message
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Chat with Admin</h2>
      <div>
        <label>Select an admin to start a conversation:</label>
        <select onChange={(e) => handleStartConversation(e.target.value)}>
          <option value="">Select an admin</option>
          {availableAdmins.map((admin) => (
            <option key={admin._id} value={admin._id}>
              {admin.fullName} ({admin.email})
            </option>
          ))}
        </select>
      </div>
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.sender === userId ? "outgoing" : "incoming"}`}>
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="new-message-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserChat;
