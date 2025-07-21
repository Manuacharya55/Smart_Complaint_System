import React from 'react'
import { useAuth } from '../context/UserContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {clearLocalStorage} = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        clearLocalStorage()
        navigate("/login")
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout