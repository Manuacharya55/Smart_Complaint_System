import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
// import { useState } from "react";
import ImageCorousal from "../../components/department/ImageCorousal";
import useComplaint from "../../hooks/useComplaint";
import { TbLocation } from "react-icons/tb";
import MapComponent from "../../components/department/MapComponent";
import Loader from "../../components/Loader";

const ComplaintDescription = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { complaint, isLoading, fetchComplaint } = useComplaint();

  useEffect(() => {
    if (user?.token) {
      fetchComplaint(id);
    }
  }, [user?.token, id]);
  return isLoading ? (
    <Loader/>
  ) : (
    <div id="container">
      <div id="description-holder">
        <h1 id="title">Complaint Details</h1>

        <h2 id="problem">{complaint.problem}</h2>

        <p
          id="status"
          style={{
            backgroundColor:
              complaint.status == "Pending"
                ? "rgb(254 56 57)"
                : complaint.status == "Processing"
                  ? "rgb(255 179 2)"
                  : "rgb(87 240 0)",
          }}
        >
          {complaint?.status}
        </p>
        <ImageCorousal images={complaint?.images} />

        <p id="type">{complaint.type}</p>
        <p style={{ textAlign: "justify" }}>{complaint.description}</p>

        <div id="location">
          <h2>Location</h2>
          <p>{complaint.location?.state}</p>
          <p>{complaint.location?.district}</p>
          <p>{complaint.location?.place}</p>
          <NavLink
            to={`https://www.google.com/maps?q=${complaint.location?.latitude},${complaint.location?.longitude}`}
            target="_blank"
          >
            Check Route in Map <TbLocation />
          </NavLink>
        </div>
        {/* {<div id="update-status">
          <h3>status</h3>
          <select
            name="status"
            id=""
            value={complaint.status}
            onChange={handleChange}
          >
            <option value="Pending">pending</option>
            <option value="Processing">processing</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>} */}
      </div>

      <MapComponent lat={complaint.location?.latitude} lng={complaint.location?.longitude} />
    </div>
  );
};

export default ComplaintDescription;
