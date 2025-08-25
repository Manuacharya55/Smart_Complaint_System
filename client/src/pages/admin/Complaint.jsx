import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { useAuth } from "../../context/UserContext";
import { getRequest } from "../../services/Api";
import Table from "../../components/admin/Table";
import Pagination from "../../components/Pagination";

const Complaint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [complaint, setComplaint] = useState([]);
  const [page,setPage] = useState(1)

  const { user } = useAuth();

  const fetchAllUsers = async () => {
    if (!user?.token) return;

    const response = await getRequest(`/complaint/all-complaints?page=${page}`, user?.token);
    console.log(response);
    if (response.success) {
      console.log(response.data);
      setComplaint(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchAllUsers();
      setIsLoading(false);
    }
  }, [user?.token,page]);

  return (
    <div id="container">
      <Banner text={"Complaints"} />

      <Table
        data={complaint}
        objkey={[
          "Complaint id",
          "Problem",
          "Type",
          "Status",
          "Department",
          "User",
          "Date",
        ]}
        renderRow={(curEle, index) => {
          return (
            <tr key={index}>
              <td>{curEle._id}</td>
              <td>{curEle.problem}</td>
              <td>{curEle.type}</td>
              <td>{curEle.status}</td>
              <td>{curEle.department?.name}</td>
              <td>{curEle.user?.fullname}</td>
              <td>{curEle.createdAt.split("T")[0]}</td>
            </tr>
          );
        }}
      />

      <Pagination setPage={setPage} page={page} users={complaint}/>
    </div>
  );
};

export default Complaint;
