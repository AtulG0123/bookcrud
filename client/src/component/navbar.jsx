import React from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

function Navbar() {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("userAuth")
    toast.success("Logout Successfully !")
    navigate('/login')
  }
  return (
    <div className="w-full h-20 flex items-center justify-between bg-gray-500 px-6">
      {/* Logo */}
      <div className=" w-[10%] h-full flex items-center">
        <h1 className="text-xl font-bold">LOGO</h1>
      </div>
      {/* Menu */}
      <div className="w-[30%] h-full">
        <ul className="w-full h-full flex gap-8 items-center text-white font-medium">
          <li className="cursor-pointer hover:text-black">Home</li>
          <li className="cursor-pointer hover:text-black">About</li>
          <li className="cursor-pointer hover:text-black">Contact</li>
        </ul>
      </div>
      <div className=" w-[5%] h-full flex items-center">
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
