import React from "react";
import { useNavigate } from "react-router-dom";
function Schedules({ setAuth }) {
  const navigate = useNavigate();

  const scheduleData = [
    { day: "Monday", time: "8:00 AM - 10:00 AM", subject: "Software Design" },
    {
      day: "Tuesday",
      time: "10:00 AM - 12:00 PM",
      subject: "Operating Systems",
    },
    {
      day: "Wednesday",
      time: "1:00 PM - 3:00 PM",
      subject: "Microprocessor Systems",
    },
    { day: "Thursday", time: "3:00 PM - 5:00 PM", subject: "CISCO 2" },
    { day: "Friday", time: "9:00 AM - 11:00 AM", subject: "PE" },
  ];

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-section">
            <li className="sidebar-section-title">Main Menu</li>
            <li>
              <a
                className="sidebar-link"
                onClick={() => navigate("/Dashboard")}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a className="sidebar-link" onClick={() => navigate("/subjects")}>
                Subjects
              </a>
            </li>
            <li>
              <a className="sidebar-link" onClick={() => navigate("/grades")}>
                Grades
              </a>
            </li>
            <li>
              <a
                className="sidebar-link active"
                onClick={() => navigate("/schedules")}
              >
                Schedules
              </a>
            </li>
            <li>
              <a className="sidebar-link" onClick={() => navigate("#")}>
                Announcements
              </a>
            </li>
            <li>
              <a className="sidebar-link" onClick={() => navigate("#")}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1>Class Schedules</h1>
        </header>

        <section className="dashboard-panel">
          <h2>Weekly Schedule</h2>
          <table
            className="schedules-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: "2px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  Day
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: "2px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  Time
                </th>
                <th
                  style={{
                    padding: "8px",
                    borderBottom: "2px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map(({ day, time, subject }, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{day}</td>
                  <td style={{ padding: "8px" }}>{time}</td>
                  <td style={{ padding: "8px" }}>{subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Schedules;
