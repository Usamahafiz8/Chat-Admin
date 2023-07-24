import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 32,
      }}
    >
      {/* Button for proceeding as Admin */}
      <Button
        variant="contained"
        style={{ fontWeight: 600, fontSize: 18 }}
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Proceed as Admin
      </Button>

      {/* Button for proceeding as Client */}
      <Button
        variant="outlined"
        style={{ fontWeight: 600, fontSize: 18 }}
        onClick={() => {
          navigate("/user/Chat");
        }}
      >
        Proceed as Client
      </Button>

    </div>
  );
};

export default UserSelection;
