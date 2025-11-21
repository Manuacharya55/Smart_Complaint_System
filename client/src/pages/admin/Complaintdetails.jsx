import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../../services/Api";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import ImageCorousal from "../../components/department/ImageCorousal";
import { toast } from "react-hot-toast";
import { TbLocation } from "react-icons/tb";
import MapComponent from "../../components/department/MapComponent";

const complaintdetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchSingleComplaint = async () => {
    if (!user) return;
    const resposne = await getRequest(`complaint/${id}`, user?.token);
    setComplaint(resposne.data);
    setIsLoading(false);
  };

  const handleChange = async (e) => {
    const response = await patchRequest(
      "complaint/",
      user?.token,
      { status: e.target.value },
      id
    );

    setComplaint(response.data);
    toast.success(response.message);
  };
  useEffect(() => {
    if (user?.token) {
      fetchSingleComplaint();
    }
  }, [user?.token]);
  return isLoading ? (
    "Loading"
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

      </div>

      <MapComponent lat={complaint.location?.latitude} lng={complaint.location?.longitude}/>
    </div>
  );
};

export default complaintdetails;
