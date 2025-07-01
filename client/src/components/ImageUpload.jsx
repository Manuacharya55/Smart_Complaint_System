import React from "react";

const ImageUpload = () => {
  const image = "data";
  return (
    <>
      <label htmlFor="image">
        <div
          id="image-upload"
          style={{
            backgroundImage: `url("https://img.freepik.com/premium-vector/image-available-icon-set-default-missing-photo-stock-vector-symbol-black-filled-outlined-style-no-image-found-sign_268104-2278.jpg")`,
          }}
        >
          {!image && "Upload Image Here"}
        </div>
      </label>
      <input type="file" name="image" id="image" />
    </>
  );
};

export default ImageUpload;
