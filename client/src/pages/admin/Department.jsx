import { useEffect } from "react";
import Table from "../../components/admin/Table";
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
  TbPencil,
  TbToggleLeftFilled,
  TbToggleRightFilled,
} from "react-icons/tb";
import Pagination from "../../components/Pagination";

const Department = () => {
  const { user } = useAuth();
  const [data, setData] = useState("");
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [page,setPage] = useState(1)

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
      response = await patchRequest(
        "department/",
        user.token,
        { name: data },
        id
      );
      if (response?.success) {
        setDepartment((prev) =>
          prev.map((curEle) =>
            curEle._id === id ? response.data : curEle
          )
        );
        toast.success(response.message);
        setIsEditing(false);
        setId(undefined);
        setData("");
      } else {
        toast.error(response?.message);
      }
    } else {
      response = await postRequest("department/", user.token, {
        name: data,
      });
      if (response?.success) {
        setDepartment((prev) => [...prev, response.data]);
        toast.success(response.message);
        setData("");
      } else {
        toast.error(response?.message);
      }
    }
    setIsClicked(false);
  };

  const fetchData = async () => {
    if (!user) return;

    const response = await getRequest(`department?page=${page}`, user?.token);
    setDepartment(response.data);
    setIsLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token]);

  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await deleteRequest("department/", user?.token, id);
    if(response.success){
      setDepartment((prev) =>
        prev.map((curEle) => (curEle._id == id ? response.data : curEle))
      );
      toast.success(response.message)
    }else{
      toast.error(response.message)
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
        <h1>Add Department</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={data}
            onChange={handleChange}
            placeholder="Enter Department Name"
          />
          <button disabled={isClicked} type="submit">
            {isClicked ? "Processing" : "Add Department"}
          </button>
        </form>
      </div>
      {isLoading ? (
        "Loading"
      ) : (
        <Table
          data={department}
          objkey={["Department Id", "Name", "Employee Count", "Operation"]}
          renderRow={(curEle, index) => (
            <tr key={curEle._id}>
              <td>{curEle._id}</td>
              <td>{curEle.name}</td>
              <td>{curEle.members?.length || 0}</td>
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

export default Department;
