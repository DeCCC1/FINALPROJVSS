import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (studentID === "1600307" && password === "password") {
      
      setAuth(true); // ✅ Set authentication state
      navigate("/dashboard"); // ✅ Navigate to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="Entire">
      {/* NAVIGATION BAR  */}
      <header className="navbar">
        <img src="/UBLOGO.png" alt="UB Logo" className="logo2" />
        <h1 className="ubTitle">UNIVERSITY OF BATANGAS</h1>
      </header>

      {/* LOGIN BOX CONTAINER */}
      <div className="main-layout">
        <div className="left-box">
          
            <a href="#" className="card-link">
              <div className="card-shadow">PVMGO</div>
            </a>
            <a href="#" className="card-link">
              <div className="card-shadow">SCHOOL</div>
            </a>
            <a href="#" className="card-link">
              <div className="card-shadow">INFORMATION</div>
            </a>
          
        </div>
        
        <div className="card login-container">
        
          <img src="/CPESS.png" alt="CPESS Logo" className="logo" />
          <form onSubmit={handleLogin}>
            <div className="studentID">
              <label>Student ID:</label>
              <br />
              <input
                type="text"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
                placeholder="1600307"
              />
            </div>
            <div className="password">
              <label>Password:</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="card right-box">
          <div className="inbox1">
            <h3>Vision</h3>
            <p>
              We envision the University of Batangas to be a center of
              educational excellence committed to serve the broader community.
            </p>
          </div>
          <div className="inbox2">
            <h3>Mission</h3>
            <p>
              The University of Batangas provides quality education by promoting
              personal and professional growth, thus enabling the person to
              participate in a global, technology and research-driven
              environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
