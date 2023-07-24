import { Grid } from "@mui/material";
import React from "react";
// @ts-ignore
import { AdminLoginForm } from "../components/loginform.tsx";

const AdminLogin = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AdminLoginForm/>
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
        style={{
          background: "#11023B",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        UCURS technical support system
Resolve customer support queries efficiently.
      </Grid>
    </Grid>
  );
};

export default AdminLogin;
