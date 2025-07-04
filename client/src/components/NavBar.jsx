import React from 'react'
import { TbBuilding, TbHome, TbListDetails, TbLocation, TbUsers } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const NavBar = ({routes}) => {

  return (
    <div id="navbar">
        <nav>
            <ul>
                {routes.map((route, index) => (
                    <li key={index}>
                        <NavLink to={route.path} className={({ isActive }) => (isActive ? "active" : "")}>
                            {route.icon}
                            <div>{route.label}</div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
  )
}

export default NavBar