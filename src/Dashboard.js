import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard({ setAuth }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  return (
    <div className="dashboard-root">
      <div className="nav navbardashboard">
        <h1>WELCOME TO UNIVERSITY OF BATANGAS</h1>
      </div>

      <div className="dashboard-content">
        
        <div className="left-box-dashboard">
          <div className="left-box-header">
            <h2>CATEGORY</h2>
          </div>
          <div className="left-box-content">Lagay dito Category</div>
        </div>

        
        <div className="center-box-dashboard">
          <div className="center-box-header">
            <h2>MAIN CONTENT</h2>
          </div>
          <div className="center-box-content">dito lagay ang dashboard</div>
        </div>

        
        <div className="right-box-dashboard">
          <div className="right-box-header">
            <h2>USER INFO</h2>
          </div>
          <div className="right-box-content">
            Name: JAM ES POGI<br />
            Role: STUDENT
            <div className="nav-links">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
