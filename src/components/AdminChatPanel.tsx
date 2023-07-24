import { Box, Divider, Grid } from "@mui/material";
import React from "react";

export const AdminChatPanel = () => {
  return (
    <div style={{display:'flex', flexDirection:"column", }}>
      <Box style={{height:"8vh"}}>name</Box>

      <Box style={{height:"75vh"}}>massage</Box>
      <div style={{display:"flex",  justifyContent:"center",alignItems:"center", height:'8vh'}}>

      text field
      </div>
    </div>
  );
};
