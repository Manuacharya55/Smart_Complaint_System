import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import Card from "../../components/user/Card";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import useComplaint from "../../hooks/useComplaint";
import Loader from "../../components/Loader";

const Complaints = () => {
  const { complaints, isLoading, fetchComplaints, pagination } = useComplaint();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.token) {
      fetchComplaints(page);
    }
  }, [user?.token, page]);

  return (
    <div id="container">
      <h1 id="title">Department Complaints</h1>
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
                role={"authority"}
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

export default Complaints;
