import React from "react";
import { useState } from "react";

const ImageCorousal = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div id="corousal-holder">
      <div id="image-frame">
        <img src={images[index]} alt="" />
      </div>
      <div id="image-preview">
        {images.map((curele, idx) => (
          <img src={curele} key={idx} onClick={() => setIndex(idx)} className={`${idx==index && "active"}`}/>
        ))}
      </div>
    </div>
  );
};

export default ImageCorousal;
