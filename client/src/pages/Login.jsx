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
    setValue,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const fillDemoData = () => {
    setValue("email", "demo@gmail.com", { shouldValidate: true });
    setValue("password", "demo123", { shouldValidate: true });
  };

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

          <button
            type="button"
            onClick={fillDemoData}
            style={{
              background: "transparent",
              color: "white",
              border: "1.5px dashed #ccc",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              width: "100%",
              letterSpacing: "0.3px",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.color = "#f97316"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "inherit"; }}
          >
            ⚡ Fill Demo Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
