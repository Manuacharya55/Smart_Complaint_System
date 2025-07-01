import React from "react";
import Tile from "../../components/Admin/Tile";
import Banner from "../../components/Admin/Banner";
import AdminForm from "../../components/Admin/AdminForm";
import { useState } from "react";
import { useEffect } from "react";
import handleGetRequest from "../../api/get";
import toast from "react-hot-toast";
import handlePostRequest from "../../api/post";
import handleDeleteRequest from "../../api/delete";
import handlePatchRequest from "../../api/patch";

const State = () => {
  const [userState, setUserState] = useState({ name: "" });
  const [State, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();

  const handleChange = (e) => {
    setUserState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isEditing
      ? handlePatchRequest(
          "admin/state/",
          userState,
          editId,
          "ashgjhasgdfj",
          setState
        )
      : handlePostRequest(
          "admin/state",
          userState,
          "2356236",
          setState
        );
    setUserState({ name: "" });
  };

  const handleEdit = (id) => {
    console.log("editing....", id);
    setIsEditing(true);
    const data = State.filter((curEle) => curEle._id == id);
    setUserState({ name: data[0].name });
    setEditId(id);
  };

  const handleDelete = (id) => {
    console.log("deleting....", id);
    handleDeleteRequest(`admin/State/`, "asdfhgasdfgs", id, setState);
  };

  useEffect(() => {
    handleGetRequest("admin/State", "ashdjkfhsjkd", setState);
    setIsLoading(false);
  }, []);

  return (
    <div id="container">
      <Banner name={"Manage State"} />

      <AdminForm
        placeholder={"State name"}
        value={userState.name}
        name={"name"}
        handleChange={handleChange}
        handleClick={handleSubmit}
      />

      <div id="tile-holder">
        {isLoading
          ? "Loading"
          : State.length > 0
          ? State.map((curEle) => (
              <Tile
                name={curEle.name}
                handleEdit={() => handleEdit(curEle._id)}
                handleDelete={() => handleDelete(curEle._id)}
                key={curEle._id}
                isActive={curEle.isActive}
              />
            ))
          : "No Data Yet"}
      </div>
    </div>
  );
};

export default State;
