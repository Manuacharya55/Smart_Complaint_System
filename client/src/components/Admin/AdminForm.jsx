import React from "react";

const AdminForm = ({
  placeholder,
  value,
  name,
  handleClick,
  handleChange,
}) => {
  return (
    <div id="form-holder">
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={value}
          name={name}
          onChange={handleChange}
          placeholder={`enter the ${placeholder}`}
        />
        <button>ADD Department</button>
      </form>
    </div>
  );
};

export default AdminForm;
