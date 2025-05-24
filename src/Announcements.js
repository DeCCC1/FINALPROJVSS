import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Announcements({ setAuth }) {
  const announcementsData = [
    {
      date: "2025-05-20",
      title: "Exam Schedule Released",
      content: "Final exam schedule is now available. Check your subjects.",
    },
    {
      date: "2025-05-18",
      title: "New Library Hours",
      content:
        "The university library will now be open until 10 PM on weekdays.",
    },
    {
      date: "2025-05-15",
      title: "Guest Lecture",
      content: "Join us for a guest lecture on AI on May 25th at 2 PM.",
    },
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
                to="/schedule" // <-- fixed route here
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
          <h1>Announcements</h1>
        </header>

        <section className="dashboard-panel">
          <h2>Latest Announcements</h2>
          <ul
            className="announcements-list"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {announcementsData.map(({ date, title, content }, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "1rem",
                }}
              >
                <h3>{title}</h3>
                <small style={{ color: "#666" }}>{date}</small>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Announcements;
