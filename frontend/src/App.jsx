import React from "react";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Footer from "./components/common/Footer";

import AppRoutes from "./routes/AppRoutes";

import "./styles/global.css";

function App() {
  return (
    <div>
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="content">
          <AppRoutes />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;