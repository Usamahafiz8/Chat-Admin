import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ChatInterface from "../../../customer/ChatInterface";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("admin:token")}`,
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUser(users.find((user) => user._id === userId));
  };

  return (
    <Container>
      <Grid container spacing={2} style={{ height: "100vh" }}>
        <Grid item xs={3}>
          <Paper>
            <Box p={2}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {/* <Avatar alt="User Avatar" src={tutorialsdev} /> */}
                <div style={{ marginLeft: "10px" }}>
                  <Typography variant="h5">Admin Account</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    My Account
                  </Typography>
                </div>
              </Box>
              <hr />
              <Box style={{ marginBottom: "20px" }}>
                <Typography variant="h6">Users</Typography>
                {users.length > 0 ? (
                  users.map(({ _id, fullName, email }) => (
                    <Box
                      key={_id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSelectUser(_id)}
                    >
                      {/* <Avatar alt="User Avatar" /> */}
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="h6">{fullName}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          {email}
                        </Typography>
                      </div>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ marginTop: "20px" }}
                  >
                    No Users
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {selectedUser && (
          <Grid item xs={9}>
            <Paper>
              <Box p={2}>
                <Typography variant="h5">User Details</Typography>
                <Avatar alt="User Avatar" src={selectedUser.avatar} />
                <Typography variant="h6">{selectedUser.fullName}</Typography>
                <Typography variant="subtitle1">{selectedUser.email}</Typography>
              </Box>

              <Box p={2}>
                {/* Display the ChatInterface component with the selected user */}
                <ChatInterface selectedUser={selectedUser} />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
