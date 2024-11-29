import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import ListUsers from '../pages/ListUsers';
import ListApproval from '../pages/ListApproval';
import Sidebar from '../components/Sidebar';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes with Sidebar */}
      <Route path="/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />
      <Route path="/listusers" element={<ListUsers />} />
      <Route path="/listapproval" element={<Sidebar><ListApproval /></Sidebar>} />
    </Routes>
  );
}

export default AppRoutes;
