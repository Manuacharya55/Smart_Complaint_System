import { useState } from "react";
import { postRequest } from "../services/Api";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../services/Schema";



const Login = () => {
  const { setLocalStorage } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const myFunc = async (data) => {

    const response = await postRequest("/auth/login/", "", data);
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

        default:
          navigate("/");
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
      <div id="dot"></div>
      <div id="auth">
        <form
          id="auth-form"
          className="background"
          onSubmit={handleSubmit(myFunc)}
        >
          <h1>Login </h1>
          <input
            type="email"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors?.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="enter your password"
            name="password"
            {...register("password")}
          />
          {errors?.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <p>
            Don't have account ? <NavLink to="/register">Register</NavLink>
          </p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "processing" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
