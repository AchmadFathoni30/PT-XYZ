import React from 'react';
import Sidebar from '../components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material';

function Dashboard() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      palette: {
        red: "#8E0000"
      },
    },
  })
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar>
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          {/* Header */}
          <header className="bg-white shadow p-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </header>
          
        </div>
        
      </Sidebar>
    </div>
  );
}

export default Dashboard;
