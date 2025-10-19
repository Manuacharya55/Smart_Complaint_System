import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/UserContext';
import { getRequest } from '../../services/Api';
import { useEffect } from 'react';
import Table from '../../components/user/Table';
import Card from '../../components/user/Card';
import Pagination from '../../components/Pagination';

const UserComplaints = () => {
  const [complaint,setComplaint] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const {user} = useAuth();
  const [page,setPage] = useState(1)

  const loadComplaints = async()=>{
    if(!user || !user?.token) return
    const response = await getRequest(`complaint?page=${page}`,user?.token);
    setComplaint(response.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    if(user?.token){
      loadComplaints();
    }
  },[user?.token])
  return (
     <div id="container">
      
        <h1 id='title'>My Complaints</h1>

      {isLoading ? (
        "Loading"
      ) : (
        <div id="card-holder">
          {complaint?.length > 0 ? complaint.map(curele => <Card img={curele.images[0]} problem={curele.problem} type={curele.type} status={curele.status}/>) : "No complaints yet"}
        </div>
      )}
      {/*   <Pagination page={page} setPage={setPage} users={complaint} /> */}

    </div>
  )
}

export default UserComplaints