import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import axiosinstance from "../../utils/axiosInstance.js";
import UserContext from "../../context/userContext.jsx";
import Input from "../Inputs/Input.jsx";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector.jsx";

const SignUp = ({ setCurrentPage }) => {
  const [profilepic, setprofilepic] = useState(null);
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adminAccessToken, setadminAccessToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { updateUser, setOpenAuthForm } = useContext(UserContext);

  const handlesignup = async (e) => {
    e.preventDefault();

    if (!fullname) return setError("Please enter your name.");
    if (!validateEmail(email))
      return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter a password.");

    setError("");

    try {
      const formData = new FormData();
      formData.append("name", fullname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("adminAccessToken", adminAccessToken);

      if (profilepic) {
        formData.append("image", profilepic);
      }

      const res = await axiosinstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);

        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        }
        navigate("/");
        setOpenAuthForm(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center h-auto md:h-[520px]">
      <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handlesignup}>
          <ProfilePhotoSelector image={profilepic} setimage={setprofilepic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            <Input
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              label="Email"
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

            <Input
              value={adminAccessToken}
              onChange={(e) => setadminAccessToken(e.target.value)}
              label="Admin Invite Token"
              placeholder="6 digit code"
              type="number"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button className="btn-primary" type="submit">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src="/images/image1.png"
          alt="Login"
          className="h-[520px] w-[33vw]"
        />
      </div>
    </div>
  );
};

export default SignUp;
