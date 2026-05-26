import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>

        <li>
          <Link to="/search-schemes">Search Schemes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;