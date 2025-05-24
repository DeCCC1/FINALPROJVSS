import React from "react";
import { useNavigate } from "react-router-dom";

function Announcements({ setAuth }) {
  const navigate = useNavigate();

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
                className="sidebar-link"
                onClick={() => navigate("/schedules")}
              >
                Schedules
              </a>
            </li>
            <li>
              <a
                className="sidebar-link active"
                onClick={() => navigate("/announcements")}
              >
                Announcements
              </a>
            </li>
            <li>
              <a className="sidebar-link" onClick={() => navigate("/profile")}>
                Profile
              </a>
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
