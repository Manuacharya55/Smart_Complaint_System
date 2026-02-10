import React from "react";
import { TbHome, TbLogout, TbUpload } from "react-icons/tb";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const UserLayout = ({ children }) => {
  const routes = [
    { path: "/user-complaints", icon: <TbHome />, label: "Home" },
    { path: "/upload-complaint", icon: <TbUpload />, label: "Upload Complaint" },
    { path: "/logout", icon: <TbLogout />, label: "Logout" },
  ];

  const { user } = useAuth();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "user") {
      navigate(-1, { replace: true });
    } else {
      setAllowed(true);
    }
  }, [user, navigate]);

  if (!allowed) return <h1>...loading</h1>;

  return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="sub-wrapper">
        <NavBar routes={routes} />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;