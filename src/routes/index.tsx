import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../admin/pages/login";
import { AdminDashboard } from "../admin/pages/dashboard";
import CustomerLogin from "../customer/pages/login";
import CustomerChatBox from "../customer/pages/chat";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/:AdminID" element={<AdminDashboard />} />
        {/* customer */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/dashboard/:conversationId" element={<CustomerChatBox />} />
      </Routes>
    </BrowserRouter>
  );
};

