import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/UserContext";
import { TbPlus } from "react-icons/tb";
import { getRequest } from "../../services/Api";
import toast from "react-hot-toast";
import UserCard from "../../components/admin/UserCard";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import useUsers from "../../hooks/useUsers";
import "../../styles/department.css";

const Users = () => {
  const { user } = useAuth();
  const {
    users,
    isLoading,
    pagination,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: null,
    department: null,
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (editMode = false, item = null) => {
    setIsEditing(editMode);
    if (editMode && item) {
      setData({
        fullname: item.fullname,
        email: item.email,
        password: "", // Don't pre-fill password
        role: item.role,
        department: item.department?._id || null,
        phone: item.phone,
      });
      setId(item._id);
    } else {
      setData({
        fullname: "",
        email: "",
        password: "",
        role: null,
        department: null,
        phone: "",
      });
      setId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData({
      fullname: "",
      email: "",
      password: "",
      role: null,
      department: null,
      phone: "",
    });
    setIsEditing(false);
  };

  // Helper to fetch departments for the dropdown
  const fetchDepartment = async () => {
    if (!user?.token) return;
    const response = await getRequest("/department", user?.token);
    if (response.success) {
      setDepartments(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    let success = false;
    if (isEditing) {
      success = await updateUser(id, data);
    } else {
      success = await addUser(data);
    }

    if (success) {
      closeModal();
    }
    setIsClicked(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchDepartment();
      fetchUsers(page);
    }
  }, [user?.token, page, fetchUsers]);

  return isLoading ? (
    <Loader />
  ) : (
    <div id="container">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 id="title" style={{ marginBottom: 0, textAlign: "left" }}>
          Users
        </h1>
        <button
          onClick={() => openModal(false)}
          style={{
            marginLeft: "auto",
          }}
        >
          <TbPlus /> Add User
        </button>
      </div>

      <div className="card-grid">
        {users.map((curEle) => (
          <UserCard
            key={curEle._id}
            user={curEle}
            onEdit={openModal}
            onDelete={deleteUser}
          />
        ))}
      </div>
      <Pagination setPage={setPage} pagination={pagination} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit User" : "Add User"}
      >
        <div id="add-department" style={{ padding: 0, marginBottom: 0 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="fullname" style={{ color: "var(---support-text)" }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter User Full Name"
                value={data.fullname}
                name="fullname"
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="email" style={{ color: "var(---support-text)" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter User Email"
                value={data.email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="password" style={{ color: "var(---support-text)" }}>
                Password {isEditing && "(Leave blank to keep current)"}
              </label>
              <input
                type="text"
                placeholder="Enter User Password"
                value={data.password}
                name="password"
                onChange={handleChange}
                required={!isEditing}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="phone" style={{ color: "var(---support-text)" }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter User Phone Number"
                value={data.phone}
                name="phone"
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="role" style={{ color: "var(---support-text)" }}>
                Role
              </label>
              <select name="role" id="" value={data.role || "null"} onChange={handleChange} required>
                <option value="null" disabled>---select---</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="authority">Authority</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="department" style={{ color: "var(---support-text)" }}>
                Department
              </label>
              <select
                name="department"
                id=""
                onChange={handleChange}
                value={data.department || "null"}
              >
                <option value="null">---select---</option>
                {departments.length > 0 &&
                  departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" disabled={isClicked}>
              {isClicked ? "Processing..." : isEditing ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
