import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import {
  TbPencil,
  TbToggleLeftFilled,
  TbToggleRightFilled,
} from "react-icons/tb";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/Api";
import { toast } from "react-hot-toast";
import Table from "../../components/admin/Table";
import Pagination from "../../components/Pagination";

const Users = () => {
  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: null,
    department: null,
    phone: "",
  });
  
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDepartment = async () => {
    if (!user?.token) return;

    const response = await getRequest("/department", user?.token);
    if (response.success) {
      setDepartments(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const fetchAllUsers = async () => {
    if (!user?.token) return;

    const response = await getRequest(`/users?page=${page}`, user?.token);
    if (response.success) {
      setUsers(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmit = async (e) => {
    setIsClicked(true);
    e.preventDefault();
    let response;
    if (!user?.token) {
      return;
    }

    if (isEditing) {
      response = await patchRequest("users/", user?.token, data, id);
    } else {
      response = await postRequest("users/", user?.token, data);
    }

    if (response?.success) {
      toast.success(response.message);

      if (isEditing) {
        setUsers((prev) =>
          prev.map((curEle) => (curEle._id === id ? response.data : curEle))
        );
      } else {
        setUsers((prev) => [...prev, response.data]);
      }
      setData("");
    } else {
      toast.error(response?.message);
    }
    setIsClicked(false);
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await deleteRequest("users/", user?.token, id);
    console.log(response);
    if (response.success) {
      toast.success(response.message);
      setUsers((prev) =>
        prev.map((curEle) => (curEle._id == id ? response.data : curEle))
      );
    } else {
      toast.error(response.message);
    }
  };

  const handleEdit = async (userid) => {
    setIsEditing(true);
    const data = users.filter((curEle) => curEle._id == userid)[0];
    setData(data);
    setId(userid);
  };

  useEffect(() => {
    if (user?.token) {
      fetchDepartment();
      fetchAllUsers();
      setIsLoading(false);
    }
  }, [user?.token, page]);

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <div id="add-department" className="background">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter User Full Name"
            value={data.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter User Email"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter User Password"
            value={data.password}
            name="password"
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Enter User Phone Number"
            value={data.phone}
            name="phone"
            onChange={handleChange}
          />
          <select name="role" id="" value={data.role} onChange={handleChange}>
            <option value="null">---select---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="authority">Authority</option>
          </select>
          <select
            name="department"
            id=""
            onChange={handleChange}
            value={data.department}
          >
            <option value="null">---select---</option>
            {departments.length > 0 &&
              departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
          <button type="submit" disabled={isClicked}>
            {isClicked ? "processing" : "Add User"}
          </button>
        </form>
      </div>

      <Table
        data={users}
        objkey={["name", "email", "phone", "role", "department", "operations"]}
        renderRow={(curEle, index) => {
          return (
            <tr key={index}>
              <td>{curEle.fullname}</td>
              <td>{curEle.email}</td>
              <td>{curEle.phone}</td>
              <td>{curEle.role}</td>
              <td>{curEle.department?.name || "Public"}</td>
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
          );
        }}
      />
     <Pagination setPage={setPage} page={page} users={users}/>
    </div>
  );
};

export default Users;
