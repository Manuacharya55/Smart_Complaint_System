import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext';
import Table from '../../components/admin/Table';
import toast from 'react-hot-toast';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../../services/Api';

const Place = () => {
const { user } = useAuth();
  const [data, setData] = useState("");
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsClicked(true);
    e.preventDefault();
    let response;
    if (!user?.token) {
      return;
    }

    if (isEditing) {
      response = await patchRequest(
        "place/",
        user?.token,
        {
          name: data,
        },
        id
      );
      setIsEditing(false);
    } else {
      response = await postRequest("place/", user?.token, {
        name: data,
      });
    }

    if (response?.success) {
      toast.success(response.message);
      setDepartment((prev) => [...prev, response.data]);
      setData("");
    } else {
      toast.error(response?.message);
    }
    setIsClicked(false);
  };

  const fetchData = async () => {
    if (!user) return;

    const response = await getRequest("place/", user?.token);
    setDepartment(response.data);
    setIsLoading(false)
    console.log(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token]);

  const handleDelete = async (id) => {
    if (!user?.token) return;

    const response = await deleteRequest("place/", user?.token, id);
    setDepartment((prev) =>
      prev.map((curEle) => (curEle._id == id ? response.data : curEle))
    );
  };

  const handleEdit = async (userid) => {
    setIsEditing(true);
    const data = department.filter((curEle) => curEle._id == userid)[0];
    setData(data.name);
    setId(userid);
  };

  return (
    <div id="container">
      <div id="add-department">
        <h1>Add Place</h1>
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
          renderRow={(item, index) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>
                <button id="edit" onClick={() => handleEdit(item._id)}>
                  Edit
                </button>
                <button id="delete" onClick={() => handleDelete(item._id)}>
                  {item.isActive ? "De-Activate" : "Activate"}
                </button>
              </td>
            </tr>
          )}
        />
      )}
    </div>
  );
};


export default Place