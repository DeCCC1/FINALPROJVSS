import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Grades() {
  const navigate = useNavigate();

  const gradesData = [
    { subject: "Software Design Lec", grade: "1.00", remarks: "Perfect" },
    { subject: "Operating Systems Lec", grade: "1.25", remarks: "Excellent" },
    {
      subject: "Microprocessor Systems Lec",
      grade: "1.50",
      remarks: "Very Good",
    },
    { subject: "CISCO 2 Lec", grade: "1.75", remarks: "Good" },
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
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1>Grades</h1>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-panel main-view">
            <h2>Grades Overview</h2>
            <table
              className="grades-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Subject
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Grade
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradesData.map(({ subject, grade, remarks }, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: "8px" }}>{subject}</td>
                    <td style={{ padding: "8px" }}>{grade}</td>
                    <td style={{ padding: "8px" }}>{remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-panel secondary-view">
            {/* Optional: add extra info or notifications */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Grades;
