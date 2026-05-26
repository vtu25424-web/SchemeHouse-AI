import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Recommendations from "../pages/Recommendations";
import SearchSchemes from "../pages/SearchSchemes";
import AdminPanel from "../pages/AdminPanel";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/search-schemes" element={<SearchSchemes />} />
      <Route path="/admin" element={<AdminPanel />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;