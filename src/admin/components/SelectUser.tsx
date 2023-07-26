import {
  Avatar,
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

interface UserModel {
  _id: string;
  fullName: string;
  role: string;
  email: string;
}

interface SelectUserProps {
  selectedUserId: string | null; // Receive the selected user ID as a prop
  onSelectUser: (userId: string) => void; // Function to handle the selected user ID
}

export const SelectUser = ({ selectedUserId, onSelectUser }: SelectUserProps) => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await Custon_Axios.get(ApiConstrains.admin.getUsers, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("admin:token")}`,
        },
      });
      const responseData = await res.data;
      setUsers(responseData);
    };
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        borderTop: "1px solid #E5E7EB",
        padding: " 16px 0",
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      <List>
        {users.map((user) => (
          <>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  5
                </IconButton>
              }
              key={user._id}
              onClick={() => onSelectUser(user._id)} // Handle user selection on click
              selected={user._id === selectedUserId} // Add 'selected' style for the selected user
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#EC5C2A" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.fullName} secondary={user.role} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};
