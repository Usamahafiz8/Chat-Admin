import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { orange } from "@mui/material/colors";
import { Chip } from "@mui/material";

export const ShowUsers = () => {
  return (
    <>
      <List sx={{ bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>H</Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={
              <Chip
                label="Owner"
                variant="outlined"
                color="primary"
                style={{ fontSize: "12px", fontWeight: 600, padding: 8 }}
              />
            }
          >
            Hamza
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={
              <Chip
                label="Owner"
                variant="outlined"
                style={{ fontSize: "12px", fontWeight: 600, padding: 8 }}
              />
            }
          >
            Ali
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>U</Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={
              <Chip
                label="Owner"
                variant="outlined"
                style={{ fontSize: "12px", fontWeight: 600, padding: 8 }}
              />
            }
          >
            Usman
          </ListItemText>
        </ListItem>
        <Divider />
      </List>
    </>
  );
};
