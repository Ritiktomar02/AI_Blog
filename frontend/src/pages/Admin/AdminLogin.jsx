import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState } from "react";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";

const AdminLogin = () => {
  const [currentpage, setcurrentpage] = useState("login");
  return (
    <>
      <div className="bg-white py-5 border-b border-gray-50">
        <div className="container mx-auto">
          <img src="/images/Logo.png" alt="logo" className="h-[26px] pl-6" />
        </div>
      </div>

      <div className="min-h-[calc(100vh-67px)] flex items-center justify-center">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
          {currentpage === "login" ? (
            <Login setcurrentpage={setcurrentpage} />
          ) : (
            <SignUp setcurrentpage={setcurrentpage} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
