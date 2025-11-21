import { useState } from "react";
import { postRequest } from "../services/Api";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { registerSchema } from "../services/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Register = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const myFunc = async (data) => {
    const response = await postRequest("/auth/register/", "", data);
    if (response.success) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
    setIsClicked(false);
  };

  return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="auth">
        <form
          onSubmit={handleSubmit(myFunc)}
          id="auth-form"
          className="background"
        >
          <h1>Register</h1>

          <input
            type="text"
            placeholder="enter your fullname"
            {...register("fullname")}
          />
          {errors?.fullname && (
            <span className="error">{errors.fullname.message}</span>
          )}
          <input
            type="email"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors?.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            type="text"
            placeholder="enter your phone number"
            {...register("phone")}
          />
          {errors?.phone && (
            <span className="error">{errors.phone.message}</span>
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
            Already have account ? <NavLink to="/login">Login</NavLink>
          </p>
          <button type="submit" disabled={isClicked}>
            {isClicked ? "processing" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
