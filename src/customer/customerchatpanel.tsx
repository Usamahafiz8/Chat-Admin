import { Box, Button, IconButton, Modal } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  height: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
};

export const CustomersPanel = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Button variant="contained" onClick={handleOpen}>
        <SupportAgentOutlinedIcon />
        &nbsp; Contact with us
      </Button>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 250,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: 8,
              background: "red",
              borderRadius: "8px 8px 0 0",
              borderBottom: "1px solid green",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h1>Contact with us</h1>
            <div onClick={handleClose} >X</div>
          </div>
          <p id="parent-modal-description">Conversation aera</p>
          <div
            style={{
              padding: 8,
              background: "red",
              borderRadius: "0 0 8px 8px ",
              borderTop: "2px solid green",
            }}
          >
            text aera
          </div>
        </Box>
      </Modal>
    </div>
  );
};
