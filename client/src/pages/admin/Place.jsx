import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import Table from "../../components/admin/Table";
import toast from "react-hot-toast";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/Api";
import {
  TbPencil,
  TbToggleLeftFilled,
  TbToggleRightFilled,
} from "react-icons/tb";
import Pagination from "../../components/Pagination";

const Place = () => {
  const { user } = useAuth();
  const [data, setData] = useState("");
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    if (!user?.token) {
      setIsClicked(false);
      return;
    }

    let response;

    if (isEditing) {
      response = await patchRequest("place/", user.token, { name: data }, id);
      setIsEditing(false);
    } else {
      response = await postRequest("place/", user.token, { name: data });
    }

    if (response?.success) {
      toast.success(response.message);
      if (isEditing) {
        setDepartment((prev) =>
          prev.map((curEle) =>
            curEle._id === (response.data?._id || id) ? response.data : curEle
          )
        );
      } else {
        setDepartment((prev) => [...prev, response.data]);
      }
      setData("");
    } else {
      toast.error(response?.message);
    }
    setIsClicked(false);
  };

  const fetchData = async () => {
    if (!user) return;

    const response = await getRequest(`place?page=${page}`, user?.token);
    setDepartment(response.data);
    setIsLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token,page]);

  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await deleteRequest("place/", user?.token, id);

    if (response.success) {
      toast.success(response.message);
      setDepartment((prev) =>
        prev.map((curEle) => (curEle._id == id ? response.data : curEle))
      );
    } else {
      toast.error(response.message);
    }
  };

  const handleEdit = async (userid) => {
    setIsEditing(true);
    const data = department.filter((curEle) => curEle._id == userid)[0];
    setData(data.name);
    setId(userid);
  };

  return (
    <div id="container">
      <div id="add-department" className="background">
        <h1>Manage Place</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={data}
            onChange={handleChange}
            placeholder="Enter Place Name"
          />
          <button disabled={isClicked} type="submit">
            {isClicked ? "Processing" : "Add Place"}
          </button>
        </form>
      </div>
      {isLoading ? (
        "Loading"
      ) : (
        <Table
          data={department}
          objkey={["Place Id", "Name", "Operation"]}
          renderRow={(curEle, index) => (
            <tr key={curEle._id}>
              <td>{curEle._id}</td>
              <td>{curEle.name}</td>
              <td>
                <div id="btn-holder">
                  <button id="edit" onClick={() => handleEdit(curEle._id)}>
                    <TbPencil />
                  </button>
                  <button id="delete" onClick={() => handleDelete(curEle._id)}>
                    {curEle.isActive ? (
                      <TbToggleLeftFilled />
                    ) : (
                      <TbToggleRightFilled />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <Pagination setPage={setPage} page={page} users={department}/>
    </div>
  );
};

export default Place;
