import { Grid } from "@mui/material";
import React from "react";
// @ts-ignore
import backgroundImage from "../../assets/BG.svg";
// @ts-ignore
import logoImage from "../../assets/chatImageforLogin.png";
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
        <AdminLoginForm />
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          background: "#11023B",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div>
            <h1
              style={{
                textAlign:"center",
                fontSize: 32,
                fontWeight: 700,
              }}
              >
              UCURS technical support system
            </h1>
            <h1
              style={{
                fontSize: 16,
                textAlign:"center",
                fontWeight: 400,
              }}
            >
              Resolve customer support queries efficiently.
            </h1>
          </div>

          <img src={logoImage} alt="Logo" style={{ width: "80%" }} />
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;

// const AdminLogin: React.FC = () => {
//   return (
//     <Grid container style={{ height: "100vh" }}>
//       {/* Background */}
//       {/* <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           zIndex: -1,
//         }}
//       /> */}

//       {/* Login Form */}
//       <Grid
//         item
//         xl={6}
//         lg={6}
//         md={12}
//         sm={12}
//         xs={12}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <AdminLoginForm />
//       </Grid>

//       {/* Logo */}
//       <Grid
//         item
//         xl={6}
//         lg={6}
//         md={12}
//         sm={12}
//         xs={12}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           // width: "100%",
//           // height: "100%",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           // zIndex: -1,
//           background: "#11023B",
//           color: "#ffffff",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <img src={logoImage} alt="Logo" style={{ maxWidth: "100%" }} />
//       </Grid>
//     </Grid>
//   );
// };

// export default AdminLogin;
