import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { RiHome9Line } from "react-icons/ri";
import { MdList } from "react-icons/md";

const UserLayout = () => {
  const links = [
    {
      link: "/upload-complaint",
      icon: <RiHome9Line />,
    },
    {
      link: "/all-complaint",
      icon: <MdList />,
    },
  ];
  return (
    <div id="container">
      <NavBar links={links}/>
      <Outlet />
    </div>
  );
};

export default UserLayout;
