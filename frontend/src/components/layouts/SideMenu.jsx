import React, { useContext } from "react";
import { SIDE_MENU_DATA, BLOG_NAVBAR_DATA } from "../../utils/data";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
  const { user,setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    setOpenSideMenu((prevstate) => !prevstate);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null)
    setOpenSideMenu((prevstate) => !prevstate);
    navigate("/");
  };

  const menuItems = isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA;

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      {user && (
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullname={user?.name}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          <div>
            <h5 className='text-gray-950 font-medium leading-6 mt-1 "'>
              {user?.name || ""}
            </h5>
            <p className="text-[13px] font-medium text-gray-800  text-center">
              {user?.email || ""}
            </p>
          </div>
        </div>
      )}

      {menuItems.map((item, index) => (
        <button
          key={`menu${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-white bg-linear-to-r from-sky-500 to-cyan-400"
              : ""
          } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      {user && (
        <button
          className="w-full items-center flex gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer"
          onClick={() => handleLogout()}
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      )}
    </div>
  );
};

export default SideMenu;
