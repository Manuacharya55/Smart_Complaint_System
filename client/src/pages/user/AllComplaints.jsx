import React from 'react'
import Card from '../../components/Card'

const AllComplaints = () => {
  return (
    <div id="card-holder">
        {Array(10).fill(0).map(()=> <Card />)}
    </div>
  )
}

export default AllComplaints