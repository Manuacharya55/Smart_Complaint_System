import React, { useState } from "react";
import AuthComponent from "../components/AuthComponent";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const component = [
    {
      field: "name",
      type: "text",
      value: user.name
    },
    {
      field: "email",
      type: "email",
      value: user.email
    },
    {
      field: "password",
      type: "password",
      value: user.password
    },
    {
      field: "phone",
      type: "tel",
      value: user.phone
    },
  ];

  return (
    <div id="container">
      <AuthComponent component={component} name={"register"} handleChange={handleChange}/>
    </div>
  );
};

export default Register;
