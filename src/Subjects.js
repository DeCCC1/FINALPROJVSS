import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Subjects({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  const subjectList = [
    { code: "CPE11E", name: "Software Design Lec", units: 3 },
    { code: "CPE12E", name: "Operating Systems Lec", units: 4 },
    { code: "CPE13E", name: "Microprocessor Systems Lec", units: 3 },
    { code: "ELEC1E", name: "CISCO 2 Lec", units: 2 },
  ];

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-section">
            <li className="sidebar-section-title">Main Menu</li>
            <li>
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subjects"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Subjects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/grades"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Grades
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/announcements"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Announcements
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          <button aria-label="Logout" onClick={handleLogout}>
            logout
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1>Subjects</h1>
        </header>

        <section className="dashboard-panel">
          <h2>Enrolled Subjects</h2>
          <table className="subjects-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((subj, index) => (
                <tr key={index}>
                  <td>{subj.code}</td>
                  <td>{subj.name}</td>
                  <td>{subj.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Subjects;
