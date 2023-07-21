import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { AdminChatPanel } from "../../components/AdminChatPanel";
import { ShowUsers } from "../../components/ShowUsers";
import { top100Films } from "../../content/toptenstre";
// import { Search } from "@mui/icons-material";

export const AdminDashboard = () => {
  return (
    <div style={{ padding: "0 128px 0 128px", background: "#F9FAFB" }}>
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            background: "#ffffff",
            border: "1px solid #E5E7EB",
            // padding: "48px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #E5E7EB",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
              Chat
            </Typography>

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films}
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search user"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Box>
          <ShowUsers />
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          style={{
            background: "#ffffff",
            border: "1px solid #E5E7EB",
          }}
        >
          <AdminChatPanel />
        </Grid>
      </Grid>
    </div>
  );
};
