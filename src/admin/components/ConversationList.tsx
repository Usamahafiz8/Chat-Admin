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
  setConversationUSername: (ConversationID: string) => void;
  conversationID: any
}

interface Conversation {
  _id: string;
  // Add other properties of the conversation if needed
}

export const ConversationList = ({
  ConversationSelection,
  setConversationUSername,
  conversationID
}: SelectConversationProps) => {
  const { AdminID } = useParams<{ AdminID: string }>();
  const [ConversationPersonName, setConversationPersonName] = useState<string[]>([]);
  const [ConversationIDs, setConversationIDs] = useState<string[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

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
          console.log(conversations);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [AdminID]);

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    ConversationSelection(conversationId);
  };

  return (
    <div
      style={{
        borderTop: "1px solid #E5E7EB",
        padding: " 16px 0",
        height: "70vh",
        overflowY: "scroll",
      }}
    >
      <List>
        {conversations.map((user) => (
          <>
            <ListItem
              // secondaryAction={
              //   <IconButton edge="end" aria-label="delete">
              //     5
              //   </IconButton>
              // }
              key={user._id}
              onClick={() =>{handleConversationClick(user._id)
                setConversationUSername(user.useremail) }} // Handle user selection on click
              selected={user._id === conversationID} // Add 'selected' style for the selected user
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#EC5C2A" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.useremail} secondary={user.UserRole} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};
