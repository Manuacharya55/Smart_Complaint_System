import React from "react";

const Card = () => {
  return (
    <div id="card">
      <div id="image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFiAzrINsn5ag1p484BimvKoAL0nnxN1NCA&s"
          alt=""
        />

        <div id="type">Critical</div>
        <div id="progress">
          <p>Pathhole</p>
          <p>Complete</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
