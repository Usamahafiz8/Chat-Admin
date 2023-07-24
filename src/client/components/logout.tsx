import React from "react";

const Logout = () => {
  const handleLogout = () => {
    // Perform logout actions, e.g., clear local storage, etc.
    localStorage.removeItem("user:token");
    // Redirect to login page after logout
    window.location.href = "/users/sign_in";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
