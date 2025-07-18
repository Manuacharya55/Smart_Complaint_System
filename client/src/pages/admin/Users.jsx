import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/Api";
import { toast } from "react-hot-toast";
import Table from "../../components/admin/Table";

const Users = () => {
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

    const response = await getRequest("/users", user?.token);
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
    setUsers((prev) =>
      prev.map((curEle) => (curEle._id == id ? response.data : curEle))
    );
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
  }, [user?.token]);

  return isLoading ? (
    "Loading"
  ) : (
    <div id="container">
      <div id="add-department">
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

      {/* yet to develop */}
      <div id="add-department">
        <form>
          <input type="text" placeholder="Search User By Name" />
          <select name="departement" id="">
            <option value="null">---select---</option>
            {departments.length > 0 &&
              departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
          <select name="role" id="" value={data.role} onChange={handleChange}>
            <option value="null">---select---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="authority">Authority</option>
          </select>
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
                <button id="edit" onClick={() => handleEdit(curEle._id)}>
                  Edit
                </button>
                <button id="delete" onClick={() => handleDelete(curEle._id)}>
                  {curEle.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default Users;
