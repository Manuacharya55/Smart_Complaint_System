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

const Department = () => {
  const [userDepartment, setUserDepartment] = useState({ name: "" });
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();
  const handleChange = (e) => {
    setUserDepartment((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isEditing
      ? handlePatchRequest(
          "admin/department/",
          userDepartment,
          editId,
          "ashgjhasgdfj",
          setDepartment
        )
      : handlePostRequest(
          "admin/department",
          userDepartment,
          "2356236",
          setDepartment
        );
    setUserDepartment({ name: "" });
  };

  const handleEdit = (id) => {
    console.log("editing....", id);
    setIsEditing(true);
    const data = department.filter((curEle) => curEle._id == id);
    setUserDepartment({ name: data[0].name });
    setEditId(id);
  };

  const handleDelete = (id) => {
    console.log("deleting....", id);
    handleDeleteRequest(`admin/department/`, "asdfhgasdfgs", id, setDepartment);
  };

  useEffect(() => {
    handleGetRequest("admin/department", "ashdjkfhsjkd", setDepartment);
    setIsLoading(false);
  }, []);

  return (
    <div id="container">
      <Banner name={"Manage Department"} />

      <AdminForm
        placeholder={"department name"}
        value={userDepartment.name}
        name={"name"}
        handleChange={handleChange}
        handleClick={handleSubmit}
      />

      <div id="tile-holder">
        {isLoading
          ? "Loading"
          : department.length > 0
          ? department.map((curEle) => (
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

export default Department;
