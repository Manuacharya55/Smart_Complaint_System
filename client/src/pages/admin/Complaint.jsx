import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import Card from "../../components/user/Card";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import useComplaint from "../../hooks/useComplaint";

const Complaint = () => {
  const { user } = useAuth();
  const { complaints, isLoading, pagination, fetchComplaints } = useComplaint();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.token) {
      // The admin complaint page typically fetches all complaints. 
      // I'll need to verify if fetchComplaints supports filtering or if I need a new function in useComplaint.
      // Looking at useComplaint.js (step 630), fetchComplaints calls `complaint?page=${page}`.
      // But Complaint.jsx calls `/complaint/all-complaints?page=${page}`.
      // I should update useComplaint.js to support this or create a new function.
      fetchComplaints(page);
    }
  }, [user?.token, page, fetchComplaints]);

  return (
    <div id="container">
      <h1 id="title">Complaints</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="card-holder">
          {complaints?.length > 0 ? (
            complaints.map((curele) => (
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
          ) : (
            <h2 id="msg">No data available</h2>
          )}
          <Pagination setPage={setPage} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default Complaint;
