import React from "react";
import { TbListDetails, TbLogout } from "react-icons/tb";
import NavBar from "../components/NavBar";

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

export default DepartmentLayout;
