import { useState } from "react";
import { postRequest } from "../services/Api";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    const response = await postRequest("/auth/register/", "", user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsClicked(false);
  };

  return (
    <div id="auth">
      <form onSubmit={handleSubmit} id="auth-form">
      <h1>Register</h1>

      <input
        type="text"
        placeholder="enter your fullname"
        name="fullname"
        value={user.fullname}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="enter your email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your phone number"
        name="phone"
        value={user.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <p>Already have account ? <NavLink to="/login">Login</NavLink></p>
      <button type="submit" disabled={isClicked}>
        {isClicked ? "processing" : "Register"}
      </button>
    </form>
    </div>
  );
};

export default Register;
