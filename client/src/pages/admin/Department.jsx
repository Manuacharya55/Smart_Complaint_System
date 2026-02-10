import { useEffect } from "react";
import DepartmentCard from "../../components/admin/DepartmentCard";
import { useAuth } from "../../context/UserContext";
import { useState } from "react";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/Api";
import toast from "react-hot-toast";
import {
  TbPlus,
} from "react-icons/tb";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

const Department = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const openModal = (editMode = false, item = null) => {
    setIsEditing(editMode);
    if (editMode && item) {
      setData({ name: item.name, description: item.description });
      setId(item._id);
    } else {
      setData({ name: "", description: "" });
      setId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData({ name: "", description: "" });
    setIsEditing(false);
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
      response = await patchRequest("department/", user.token, data, id);
      if (response?.success) {
        setDepartment((prev) =>
          prev.map((curEle) => (curEle._id === id ? response.data : curEle))
        );
        toast.success(response.message);
        closeModal();
      } else {
        toast.error(response?.message);
      }
    } else {
      response = await postRequest("department/", user.token, data);
      if (response?.success) {
        setDepartment((prev) => [...prev, response.data]);
        toast.success(response.message);
        closeModal();
      } else {
        toast.error(response?.message);
      }
    }
    setIsClicked(false);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const fetchData = async () => {
    if (!user) return;

    const response = await getRequest(`department?page=${page}`, user?.token);
    if (response.success) {
      setDepartment(response.data);
      setPagination(response.pagination);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token, page]);

  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await deleteRequest("department/", user?.token, id);
    if (response.success) {
      setDepartment((prev) =>
        prev.map((curEle) => (curEle._id == id ? response.data : curEle))
      );
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div id="container">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 id="title" style={{ marginBottom: 0, textAlign: "left" }}>
          Departments
        </h1>
        <button
          onClick={() => openModal(false)}
          style={{
            marginLeft: "auto"
          }}
        >
          <TbPlus /> Add Department
        </button>
      </div>

      <div className="department-card-grid">
        {department.map((dept) => (
          <DepartmentCard
            key={dept._id}
            department={dept}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination setPage={setPage} pagination={pagination} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit Department" : "Add Department"}
      >
        <div id="add-department" style={{ padding: 0, marginBottom: 0 }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label htmlFor="name" style={{ color: "var(---support-text)" }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Department Name"
                required
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label
                htmlFor="description"
                style={{ color: "var(---support-text)" }}
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Enter Department Description"
                rows="4"
              ></textarea>
            </div>
            <button disabled={isClicked} type="submit">
              {isClicked ? "Processing..." : isEditing ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Department;
