import React from "react";
import { LuPen } from "react-icons/lu";
import { RiDeleteBin4Line } from "react-icons/ri";
const Tile = ({name,handleEdit,handleDelete,isActive}) => {
  return (
    <div id="tile">
      <div id="tile-name">{name}</div>
      {isActive ? "Active" : "In-Active"}
      <div id="tile-menu">
        <button onClick={handleEdit}>
          <LuPen />
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin4Line />
        </button>
      </div>
    </div>
  );
};

export default Tile;
