import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { useAuth } from "../../context/UserContext";
import { getRequest } from "../../services/Api";
import Table from "../../components/admin/Table";
import Pagination from "../../components/Pagination";
import Card from "../../components/user/Card";

const Complaint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [complaint, setComplaint] = useState([]);
  const [page,setPage] = useState(1)

  const { user } = useAuth();

  const fetchAllUsers = async () => {
    if (!user?.token) return;

    const response = await getRequest(`/complaint/all-complaints?page=${page}`, user?.token);
    if (response.success) {
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
      <h1 id="title">Complaints</h1>
      {isLoading ? (
        "Loading"
      ) : (
        <div id="card-holder">
          {complaint?.length > 0
            ? complaint.map((curele) => (
                <Card
                  key={curele._id}
                  img={curele.images[0]}
                  problem={curele.problem}
                  type={curele.type}
                  status={curele.status}
                  role={"admin"}
                  _id={curele._id}
                />
              ))
            : "No complaints yet"}
        <Pagination setPage={setPage} page={page} users={complaint}/>
        </div>
      )}
    </div>
  );
};

export default Complaint;
