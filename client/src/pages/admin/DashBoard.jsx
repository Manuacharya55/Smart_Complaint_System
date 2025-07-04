import React from "react";
import Tile from "../../components/Tile";
import QuickLinks from "../../components/QuickLinks";
import { BsBuilding } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { TbLocation } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import Banner from "../../components/Banner";

const DashBoard = () => {
  return (
    <div id="container">
      <Banner text={"Dashboard"} />
      <div id="tile-container">
        <Tile name={"Total Users"} count={10} />
        <Tile name={"Total Department"} count={5} />
        <Tile name={"Total Places"} count={10} />
      </div>

      <div id="tile-container">
        <Tile name={"Pending Complaints"} count={5} />
        <Tile name={"Processing Complaints"} count={10} />
        <Tile name={"Solved Complaint"} count={10} />
      </div>

      <div id="dashbaord-links">
        <QuickLinks icon={<TbUsers />} text={"Users"} link={"/users"} />
        <QuickLinks
          icon={<BsBuilding />}
          text={"Departments"}
          link={"/department"}
        />
        <QuickLinks icon={<TbLocation />} text={"Locations"} link={"/places"} />
        <QuickLinks
          icon={<TbListDetails />}
          text={"Complaints"}
          link={"/complaints"}
        />
      </div>
    </div>
  );
};

export default DashBoard;
