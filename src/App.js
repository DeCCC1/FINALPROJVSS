import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./LoginForm";
import Dashboard from "./Dashboard";
import Subjects from "./Subjects";
import Grades from "./Grades";
import Schedule from "./Schedule";
import Announcements from "./Announcements";
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
          path="/subjects"
          element={<Subjects setAuth={setIsAuthenticated} />}
        />
        <Route
          path="/grades"
          element={<Grades setAuth={setIsAuthenticated} />}
        />
        <Route
          path="/Schedule"
          element={<Schedule setAuth={setIsAuthenticated} />}
        />
        <Route
          path="/announcements"
          element={<Announcements setAuth={setIsAuthenticated} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
