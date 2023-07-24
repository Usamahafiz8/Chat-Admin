import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Img1 from "../../assets/img1.jpg";


// type TSearchPeople = {
//     users: any[];
//   };
  
  export const SearchPeople = ({ users , fetchMessages }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredUsers = users.filter((user) =>
      user.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <>
        <TextField
          fullWidth
          label="Search by email"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredUsers.length > 0 ? (
          filteredUsers.map(({ userId, user }) => (
            <Box
              key={userId}
              display="flex"
              alignItems="center"
              py={2}
              borderBottom="1px solid #ccc"
              cursor="pointer"
              onClick={() => fetchMessages("new", user)}
            >
              <Avatar alt="User Avatar" src={Img1} />
              <Box ml={2}>
                <Typography variant="h6">{user?.fullName}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center" mt={4}>
            No Users
          </Typography>
        )}
      </>
    );
  };
  