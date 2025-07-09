import React, { use, useState } from "react";
import Image from "../../components/user/Image";
import Banner from "../../components/Banner";
import { handleUpload } from "../../services/ImageUpload";

const UploadComplaint = () => {
  const [image, setImage] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  return (
    <div id="container">
      <Banner text={"Upload a Complaint"} />
      <form>
        <div id="image-holder">
          <Image image={image.image1} uploadImage={handleUpload} setState={setImage} name={"image1"} />
        </div>
        <div id="image-holder">
          <Image image={image.image2} uploadImage={handleUpload} setState={setImage} name={"image2"} />
          <Image image={image.image3} uploadImage={handleUpload} setState={setImage} name={"image3"} />
        </div>

        <button>upload complaint</button>
      </form>
    </div>
  );
};

export default UploadComplaint;
