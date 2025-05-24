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
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-section">
            <li className="sidebar-section-title">Main Menu</li>

            <li>
              <Link to="/Dashboard" className="sidebar-link active">
                {/* Home Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.707 2.293A.996.996 0 0 0 12 2H3a1 1 0 0 0-1 1v9c0 .266.105.52.293.707l9 9a.997.997 0 0 0 1.414 0l9-9a.999.999 0 0 0 0-1.414l-9-9zM12 19.586l-8-8V4h7.586l8 8L12 19.586z" />
                    <circle cx="7.507" cy="7.505" r="1.505" />
                  </svg>
                </span>
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/subjects" className="sidebar-link">
                {/* Subjects Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                  </svg>
                </span>
                Subjects
              </Link>
            </li>

            <li>
              <Link to="/grades" className="sidebar-link">
                {/* Grades Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z" />
                    <path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z" />
                  </svg>
                </span>
                Grades
              </Link>
            </li>

            <li>
              <Link to="/schedule" className="sidebar-link">
                {/* Schedule Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 4h-1v2h1v-2zm15 0h-1v2h1v-2zm-8 3c-3.314 0-6 2.686-6 6 0 3.313 2.686 6 6 6s6-2.687 6-6c0-3.314-2.686-6-6-6zm0 2a4 4 0 110 8 4 4 0 010-8zm9-2v16c0 1.104-.896 2-2 2h-14c-1.104 0-2-.896-2-2v-16c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2zm-2 0v2h-14v-2h14zm-7 3c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
                  </svg>
                </span>
                Schedule
              </Link>
            </li>

            <li>
              <Link to="/announcements" className="sidebar-link">
                {/* Announcements Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h2v-2H3v2zm14.293-6.707l-1.414 1.414c1.165 1.165 1.165 3.071 0 4.236l1.414 1.414c1.949-1.949 1.949-5.115 0-7.064zM19 3h-2v2h2V3zm-4.707 2.707l-1.414-1.414C9.93 6.36 8.933 10.966 12 14.034c3.067-3.068 2.07-7.674-.293-11.327zm2.707 14.293v2h2v-2h-2zm-12 0h2v2h-2v-2z" />
                  </svg>
                </span>
                Announcements
              </Link>
            </li>

            <li>
              <Link to="/profile" className="sidebar-link">
                {/* Profile Icon */}
                <span className="sidebar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.859 0-7 3.141-7 7h2c0-2.757 2.243-5 5-5s5 2.243 5 5h2c0-3.859-3.141-7-7-7z" />
                  </svg>
                </span>
                Profile
              </Link>
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
          <h1>University of Batangas</h1>
          <div className="main-actions"></div>
        </header>
        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon stat-accent">
              {/* Subjects Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z" />
                <path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z" />
              </svg>
            </div>
            <div>
              <span className="stat-number">8</span>
              <div className="stat-label">Total Subjects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              {/* Grades Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 10H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1zm-1 10H5v-8h14v8zM5 6h14v2H5zM7 2h10v2H7z" />
              </svg>
            </div>
            <div>
              <span className="stat-number">89%</span>
              <div className="stat-label">Average Grade</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              {/* Schedule Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M5 4h-1v2h1v-2zm15 0h-1v2h1v-2zm-8 3c-3.314 0-6 2.686-6 6 0 3.313 2.686 6 6 6s6-2.687 6-6c0-3.314-2.686-6-6-6zm0 2a4 4 0 110 8 4 4 0 010-8zm9-2v16c0 1.104-.896 2-2 2h-14c-1.104 0-2-.896-2-2v-16c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2zm-2 0v2h-14v-2h14zm-7 3c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
              </svg>
            </div>
            <div>
              <span className="stat-number">5</span>
              <div className="stat-label">Upcoming Classes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              {/* Announcements Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 13h2v-2H3v2zm14.293-6.707l-1.414 1.414c1.165 1.165 1.165 3.071 0 4.236l1.414 1.414c1.949-1.949 1.949-5.115 0-7.064zM19 3h-2v2h2V3zm-4.707 2.707l-1.414-1.414C9.93 6.36 8.933 10.966 12 14.034c3.067-3.068 2.07-7.674-.293-11.327zm2.707 14.293v2h2v-2h-2zm-12 0h2v2h-2v-2z" />
              </svg>
            </div>
            <div>
              <span className="stat-number">3</span>
              <div className="stat-label">Announcements</div>
            </div>
          </div>
        </section>
        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <h2>Category Section</h2>
            <div className="category-list">
              <div className="category-item">Subjects</div>
              <div className="category-item">Grades</div>
              <div className="category-item">Schedule</div>
              <div className="category-item">Announcements</div>
              <div className="category-item">Profile</div>
            </div>
          </div>
          <div className="dashboard-panel main-view">
            <h2>Main View</h2>
            <div>
              This is the main view area where selected content will be
              displayed. You can enhance it with dynamic data and interactive
              components.
            </div>
          </div>
          <div className="dashboard-panel secondary-view">
            <h2>Secondary View</h2>
            <div>
              This is an additional view area for extra information,
              notifications, or other relevant panels.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
