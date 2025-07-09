import React from 'react'
import { TbBuilding, TbHome, TbListDetails, TbLocation, TbUsers } from 'react-icons/tb';
import NavBar from '../components/NavBar';

const UserLayout = ({children}) => {
let routes = [
    {
      path: "/upload-complaint",
      icon: <TbHome />,
      label: "Home",
    },
    {
      path: "/user-complaints",
      icon: <TbListDetails />,
      label: "Complaints",
    },
  ];
  return (
    <>
      <NavBar routes={routes} />
      {children}
    </>
  );
}

export default UserLayout