import React, { useState } from "react";
import AuthComponent from "../components/AuthComponent";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const component = [
    {
      field: "email",
      type: "email",
      value: user.email,
    },
    {
      field: "password",
      type: "password",
      value: user.password,
    },
  ];

  return (
    <div id="container">
      <AuthComponent
        component={component}
        name={"login"}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Login;
