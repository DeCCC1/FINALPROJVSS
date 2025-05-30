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
    } else if (studentID === "prof123" && password === "adminpass") {
      setAuth({ role: "professor" });
      navigate("/prof-dashboard");
    } else {
      alert("Invalid credentials");
      setStudentID("");
      setPassword("");
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
          <a href="https://ub.edu.ph/ubbc/about/" className="card-link">
            <div className="card-shadow">PVMGO</div>
          </a>
          <a href="https://ub.edu.ph" className="card-link">
            <div className="card-shadow">SCHOOL</div>
          </a>
          <a href="https://ub.edu.ph/ubbc/engineering/" className="card-link">
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
              The Computer Engineering Department envisions to be recognized as
              one of the leading providers of competitive IT professionals in
              various IT related industries both locally and internationally. It
              commits itself in delivering quality education, and thus, strives
              to become a center of excellence.
            </p>
          </div>
          <div className="inbox2">
            <h3>Mission</h3>
            <p>
              The Computer Engineering department is committed in preparing its
              graduates for professional computer engineering careers which
              includes leading roles in the design, analysis and application of
              computing structures that involve hardware and software. The
              graduates must have a strong foundation in their education in
              order to participate in a global, technological, and
              research-driven environment.
            </p>
          </div>
        </div>
        
      </div>
      <div className="LoginForm-footer">
  © 2025 CPESS Student Portal. All rights reserved.
</div>
    </div>
    
  );
}

export default Login;
