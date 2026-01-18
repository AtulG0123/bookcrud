import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // Must prevent default

  try {
    const { data } = await api.post("/User/login", formData);

    if (!data.success) {
      toast.error(data.message);
      return; // stop execution
    }

    localStorage.setItem(
      "userAuth",
      JSON.stringify({ isLogin: true, token: data.token })
    );
    toast.success(data.message);
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login Failed");
  }
};

  // Prevent visiting login page if already logged in
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("userAuth"));
    if (authUser?.isLogin) navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="Email"
            value={formData.Email}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={formData.Password}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
