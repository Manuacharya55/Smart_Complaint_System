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
    <>
      <NavBar routes={routes} />
      {children}
    </>
  );
};

export default DepartmentLayout;
