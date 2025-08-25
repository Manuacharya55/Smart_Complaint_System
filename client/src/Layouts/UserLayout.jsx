import React from 'react'
import {TbHome,TbLogout,TbUpload, } from 'react-icons/tb';
import NavBar from '../components/NavBar';

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
  return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="sub-wrapper">
        <NavBar routes={routes} />
      {children}
      </div>
    </div>
  );
}

export default UserLayout