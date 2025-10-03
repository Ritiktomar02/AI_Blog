import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import axiosinstance from "../../utils/axiosInstance.js";
import UserContext from "../../context/userContext.jsx";
import Input from "../Inputs/Input.jsx";

const Login = ({ setCurrentPage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { updateUser, setOpenAuthForm } = useContext(UserContext);

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    try {
      const res = await axiosinstance.post(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password,
      });
      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        }
        setOpenAuthForm(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error has occured. Please try again");
      }
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[2px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handlelogin}>
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button className="btn-primary" type="submit">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have a account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("signup")}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>

      <div className="hidden md:block">
        <img src="/images/image1.png" alt="Login" className="h-[400px]" />
      </div>
    </div>
  );
};

export default Login;
