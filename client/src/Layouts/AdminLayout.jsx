import React from "react";
import NavBar from "../components/NavBar";
import {
  TbBuilding,
  TbHome,
  TbListDetails,
  TbLocation,
  TbLogout,
  TbUsers,
} from "react-icons/tb";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") {
      navigate(-1, { replace: true });
    } else {
      setAllowed(true);
    }
  }, [user, navigate]);

  if (!allowed) return <h1>...loading</h1>;

  const routes = [
    { path: "/dashboard", icon: <TbHome />, label: "Home" },
    { path: "/users", icon: <TbUsers />, label: "Users" },
    { path: "/department", icon: <TbBuilding />, label: "Department" },
    { path: "/places", icon: <TbLocation />, label: "Places" },
    { path: "/complaints", icon: <TbListDetails />, label: "Complaints" },
    { path: "/logout", icon: <TbLogout />, label: "Logout" },
  ];

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

export default AdminLayout;
