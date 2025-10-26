import React from 'react'
import {TbHome,TbLogout,TbUpload, } from 'react-icons/tb';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserLayout = ({children}) => {
let routes = [
    {
      path: "/user-complaints",
      icon: <TbHome />,
      label: "Home",
    },
    {
      path: "/upload-complaint",
      icon: <TbUpload />,
      label: "Upload Complaint",
    },
    {
      path: "/logout",
      icon: <TbLogout /> ,
      label: "Logout",
    },
  ];

  const {user} = useAuth()
  const navigate = useNavigate();

  if(user == null) return <h1>...loading</h1>

  if(user.role == "user") return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="sub-wrapper">
        <NavBar routes={routes} />
      {children}
      </div>
    </div>
  );

  return navigate(-1)
}

export default UserLayout