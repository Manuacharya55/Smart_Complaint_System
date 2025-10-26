import React from "react";
import { TbListDetails, TbLogout } from "react-icons/tb";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DepartmentLayout = ({ children }) => {
  let routes = [
    {
      path: "/department-complaints",
      icon: <TbListDetails />,
      label: "Complaints",
    },
    {
      path: "/logout",
      icon: <TbLogout />,
      label: "Logout",
    },
  ];

  const {user} = useAuth();
  const navigate = useNavigate();

  if(user == null) return <h1>...loading</h1>

  if(user.role == "authority") return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="sub-wrapper">
        <NavBar routes={routes} />
      {children}
      </div>
    </div>
  );

  return navigate(-1)
};

export default DepartmentLayout;
