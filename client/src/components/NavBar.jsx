import React from "react";
import { RiHome9Line } from "react-icons/ri";
import { MdList } from "react-icons/md";
import { NavLink } from "react-router-dom";
const NavBar = ({links}) => {
  return (
      <div id="navbar-holder">
        <nav>
          <ul>
            {links.map((curEle)=> <li><NavLink to={curEle.link}>{curEle.icon}</NavLink></li>)}
          </ul>
        </nav>
      </div>
  );
};

export default NavBar;
