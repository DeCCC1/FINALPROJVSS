import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./LoginForm";
import Dashboard from "./Dashboard";
import ProfessorDashboard from "./ProfessorDashboard";

import "./App.css";
import "./LoginForm.css";
import "./Dashboard.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        <Route
          path="/Dashboard"
          element={<Dashboard setAuth={setIsAuthenticated} />}
        />
        <Route
          path="/prof-dashboard"
          element={<ProfessorDashboard setAuth={setIsAuthenticated} />}
        />
      </Routes>
    </BrowserRouter>

        
  );
}

export default App;
