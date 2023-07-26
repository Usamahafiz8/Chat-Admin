import {
    Avatar,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import PersonIcon from "@mui/icons-material/Person";
  import Custon_Axios from "../../components/API";
  import { ApiConstrains } from "../../components/API/ApiConstrains";
  import { useParams } from "react-router-dom";
  
  interface SelectConversationProps {
    ConversationSelection: (ConversationID: string) => void; // Function to handle the selected conversation ID
  }
  
  interface Conversation {
    _id: string;
    // Add other properties of the conversation if needed
  }
  
  export const ConversationList = ({
    ConversationSelection,
  }: SelectConversationProps) => {
    const { AdminID } = useParams<{ AdminID: string }>();
    const [ConversationPersonName, setConversationPersonName] = useState<string[]>([]);

    const [ConversationIDs, setConversationIDs] = useState<string[]>([]);
    const [conversations, setConversations] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchConversations = async () => {
        try {
          const res = await Custon_Axios.get<{ conversations: Conversation[] }>(
            ApiConstrains.admin.getConversations(AdminID),
            {
              headers: {
                Authorization: `${localStorage.getItem("admin:token")}`,
              },
            }
          );
          if (res.status === 200) {
            const conversations = res.data.conversations;
            setConversations(conversations);
            const ids = conversations.map((conversation) => conversation._id);
            setConversationIDs(ids);
          }
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
      fetchConversations();
    }, [AdminID]);
  
    return (
      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: " 16px 0",
          height: "80vh",
          overflowY: "scroll",
        }}
      >
        {AdminID}
        <br />
        {ConversationIDs}
        <List>
          {/* Iterate through the conversations and display each conversation */}
          {conversations.map((conversation) => (
            <div key={conversation._id}>
              <ListItem>
                {/* Render your conversation details here */}
                {/* For example, display the conversation ID */}
                <ListItemText primary={`Conversation ID: ${conversation._id}`} />
              </ListItem>
              <Button onClick={()=>{ConversationSelection(conversation._id)}}>
              Conversation ID: ${conversation._id}
              </Button>
              <Divider />
            
            </div>
          ))}
        </List>
        {/* Add your user list or other components here if needed */}

      </div>
    );
  };
  