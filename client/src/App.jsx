import React from 'react';
import Navbar from './component/navbar.jsx';
import Home from './component/Home.jsx';
import Signup from './component/Signup.jsx';
import Login from './component/Login.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoutes from './component/ProtectedRoutes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App=()=>{
  return (
    <BrowserRouter>
      {/* 🔔 Toast container (ONLY ONCE) */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              {" "}
              <Home />{" "}
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;