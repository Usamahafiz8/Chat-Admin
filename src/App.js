import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./admin/pages/Login.tsx";
import { AdminDashboard } from "./admin/pages/dashboard.tsx";
import ClientChatInterface from "./client/pages/ChatInterface.tsx";
// @ts-ignore
import ClientLogin from "./client/pages/Login.tsx";
import UserSelection from "./components/UserSelection.tsx";


const ClientProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/user/login"} />;
  } else if (isLoggedIn && ["/user/login"].includes(window.location.pathname)) {
    console.log("object :>> ");
    return <Navigate to={"/user/Chat"} />;
  }

  return children;
};
const AdminiProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("admin:token") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/admin/login"} />;
  } else if (
    isLoggedIn &&
    ["/admin/login"].includes(window.location.pathname)
  ) {
    console.log("object :>> ");
    return <Navigate to={"/admin/dashboard"} />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSelection />} />
      {/* (user as a client) Route  */}
      <Route path="/user/login" element={<ClientLogin />} />
      <Route
        path="/user/Chat/:conversationId"
        element={
          <ClientProtectedRoute auth={true}>
          <ClientChatInterface />
          </ClientProtectedRoute>
        }
      />
      {/* ------------------------------------------------------------ */}
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard/:AdminID"
        element={
          <AdminiProtectedRoute auth={true}>
            <AdminDashboard />
          </AdminiProtectedRoute>
        }
      />
      {/* ------------------------------------------------------------ */}
    </Routes>
  );
}

export default App;
