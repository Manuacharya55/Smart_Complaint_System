import { useState } from "react";
import { postRequest } from "../services/Api";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { setLocalStorage } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
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
    const response = await postRequest("/auth/login/", "", user);
    if (response.success) {
      toast.success(response.message);
      const { token, user } = response.data;
      setLocalStorage(token, user);
      switch (user.role) {
        case "user":
          navigate("/user-complaints");
          return;

        case "admin":
          navigate("/dashboard");
          return;

        case "authority":
          navigate("/department-complaints");
          return;

        default : navigate("/")
      }
    } else {
      toast.error(response.message);
    }
    setIsClicked(false);
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div id="wrapper">
      <div id="dot">
        
      </div>
      <div id="auth">
      <form id="auth-form" className="background" onSubmit={handleSubmit}>
        <h1>Login </h1>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <p>
          Don't have account ? <NavLink to="/register">Register</NavLink>
        </p>
        <button type="submit" disabled={isClicked}>
          {isClicked ? "processing" : "Login"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
