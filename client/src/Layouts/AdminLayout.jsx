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

const AdminLayout = ({ children }) => {
  const {user} = useAuth();
  const navigate = useNavigate()
  console.log(user)

  if(user == null) return <h1>...loading</h1>

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
  if(user.role == "admin") return (
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

export default AdminLayout;
