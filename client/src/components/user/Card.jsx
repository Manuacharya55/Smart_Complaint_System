import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
const Card = ({ img, problem, type, status, role ,_id}) => {
  const navigate = useNavigate();
  console.log(role,_id)
  const style = {
    backgroundColor:
      status == "Pending"
        ? "rgb(254 56 57)"
        : status == "Processing"
        ? "rgb(255 179 2)"
        : "rgb(87 240 0)",
  };
  return (
    <div id="card" className="background">
      <img src={img} alt="" />
      <div id="detail">
        <p id="status" style={style}>
          {status}
        </p>
        <p>{type}</p>
        <p>{problem}</p>

        {role && role=="authority" && <NavLink to={`/department-complaint/${_id}`}>See Details <GoArrowUpRight /></NavLink>}

        {role && role=="admin" && <NavLink to={`/complaint/${_id}`}>See Details <GoArrowUpRight /></NavLink>}

        {role && role=="user" && <NavLink to={`/user-complaint/${_id}`}>See Details <GoArrowUpRight /></NavLink>}
      </div>
    </div>
  );
};

export default Card;
