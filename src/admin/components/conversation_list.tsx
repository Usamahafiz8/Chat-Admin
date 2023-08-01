import {
  Avatar,
    Divider,
  
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import  { useEffect, useState } from "react";
// @ts-ignore
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import { ApiList, CustonAxios } from "../../components/api";

interface SelectConversationProps {
  ConversationSelection: (ConversationID: string) => void; 
  setConversationUSername: (ConversationID: string) => void;
  conversationID: any
}

interface Conversation {
  _id: string;
}

export const ConversationList = ({
  ConversationSelection,
  setConversationUSername,
  conversationID
}: SelectConversationProps) => {
  const { AdminID } = useParams<{ AdminID: string }>();
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await CustonAxios.get<{ conversations: Conversation[] }>(
          ApiList.admin.getConversations(AdminID),
          {
            headers: {
              Authorization: `${localStorage.getItem("admin:token")}`,
            },
          }
        );
        if (res.status === 200) {
          const conversations = res.data.conversations;
          setConversations(conversations);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [AdminID]);

  const handleConversationClick = (conversationId: string) => {
    // setSelectedConversationId(conversationId);
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
              key={user._id}
              onClick={() =>{handleConversationClick(user._id)
                setConversationUSername(user.useremail) }}
              selected={user._id === conversationID} 
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
