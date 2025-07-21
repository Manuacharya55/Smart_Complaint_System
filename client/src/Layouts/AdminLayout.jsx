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

const AdminLayout = ({ children }) => {
  let routes = [
    {
      path: "/dashboard",
      icon: <TbHome />,
      label: "Home",
    },
    {
      path: "/users",
      icon: <TbUsers />,
      label: "Users",
    },
    {
      path: "/department",
      icon: <TbBuilding />,
      label: "Department",
    },
    {
      path: "/places",
      icon: <TbLocation />,
      label: "Places",
    },
    {
      path: "/complaints",
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

export default AdminLayout;
