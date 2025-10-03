import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setopenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black -mt-1"
        onClick={() => setopenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      <img src="/images/image1.png" alt="logo" className="h-[24px] md:h-[26px]" />

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 h-[calc(100vh-61px)] w-64 bg-white shadow-lg z-40">
          <SideMenu activeMenu={activeMenu} setOpenSideMenu={setopenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
