import React, { use, useState } from "react";
import Image from "../../components/user/Image";
import Banner from "../../components/Banner";
import { handleUpload } from "../../services/ImageUpload";
import { postRequest } from "../../services/Api";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UploadComplaint = () => {
  const key = import.meta.env.VITE_KEY;
  const navigate = useNavigate();
  const [image, setImage] = useState({
    image1: "",
    image2: "",
    image3: "",
    state: "",
    district: "",
    place: "",
    longitude: "",
    latitude: "",
  });
  const [disabled,setDisabled] = useState(false)
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    setDisabled(true)
    e.preventDefault();
    console.log(image)
    const response = await postRequest("complaint/", user?.token, image);

    if (response.success) {
      toast.success(response.message);
      navigate("/user-complaints");
    } else {
      toast.error(response.message);
    }
    setDisabled(false)
  };

  const rev = async (longitude, latitude) => {
    const { data } = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${key} &lat=${latitude}&lon=${longitude}&format=json&`
    );

    console.log(data)
    setImage((prev) => {
      return {
        ...prev,
        district: data.address.state_district,
        state: data.address.state,
        place: data.address.village,
        longitude,
        latitude,
      };
    });
    console.log(image)
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        rev(longitude, latitude);
      });
    }
  }, []);
  return (
    <div id="container">
      <Banner text={"Upload a Complaint"} />
      <form onSubmit={handleSubmit}>
        <div id="image-holder">
          <Image
            image={image.image1}
            uploadImage={handleUpload}
            setState={setImage}
            name={"image1"}
          />
        </div>
        <div id="image-holder">
          <Image
            image={image.image2}
            uploadImage={handleUpload}
            setState={setImage}
            name={"image2"}
          />
          <Image
            image={image.image3}
            uploadImage={handleUpload}
            setState={setImage}
            name={"image3"}
          />
        </div>

        <button disabled={disabled}>{disabled ? "Uploading..." : "upload complaint"}</button>
      </form>
    </div>
  );
};

export default UploadComplaint;
