import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/UserContext';
import { useEffect } from 'react';
import Card from '../../components/user/Card'; // unused?
import Pagination from '../../components/Pagination';
import useComplaint from '../../hooks/useComplaint';
import Loader from '../../components/Loader';

const UserComplaints = () => {
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

      <h1 id='title'>My Complaints</h1>

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
                role={user.role}
                _id={curele._id}
              />
            ))
          ) : (
            <h2 id="msg">No data available</h2>
          )}
        </div>
      )}
      <Pagination page={page} setPage={setPage} pagination={pagination} />

    </div>
  )
}

export default UserComplaints