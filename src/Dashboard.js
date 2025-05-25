import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setAuth }) {
  const navigate = useNavigate();
  const studentName = "Student1";
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef();

  const subjects = {
    OS: [
      { id: 1, name: "Quiz 1", status: "Turned In" },
      { id: 2, name: "Assignment 1", status: "Turned In" },
    ],
    WD: [
      { id: 3, name: "Responsive Web", status: "Turned In" },
      { id: 4, name: "Midterm Exam", status: "Not Turned In" },
    ],
    Microprocessor: [
      { id: 5, name: "Robot", status: "Turned In" },
      { id: 6, name: "Ultrasonic", status: "Not Turned In" },
    ],
    CISCO: [
      { id: 7, name: "WLAN", status: "Turned In" },
      { id: 8, name: "BPDU", status: "Not Turned In" },
    ],
    Feedback: [
      { id: 9, name: "PLC", status: "Turned In" },
      { id: 10, name: "Final Exam", status: "Not Turned In" },
    ],
  };

  const professorDetails = {
    OS: {
      name: "Engr. Derrick Ramos",
      email: "sample.email.com",
    },
    WD: {
      name: "Engr. Derrick Ramos",
      email: "sample.email.com",
    },
    Microprocessor: {
      name: "Engr. Liza Maderazo",
      email: "sample.email.com",
    },
    CISCO: {
      name: "Engr. Liza Maderazo",
      email: "sample.email.com",
    },
    Feedback: {
      name: "Engr. Pablo Asi",
      email: "sample.email.com",
    },
  };

  const subjectNames = Object.keys(subjects);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-root">
      {/* Header */}
      <div
        className="nav navbardashboard"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#771100",
          color: "white",
        }}
      >
        <img
          src="CPESS.png"
          alt="CPESS Logo"
          style={{ height: "75px", cursor: "pointer" }}
        />

        {/* Student name dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownVisible((prev) => !prev)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#a30000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#cc0000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#a30000")
            }
          >
            {studentName}
          </button>

          {dropdownVisible && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "6px",
                overflow: "hidden",
                zIndex: 1000,
                minWidth: "100px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  display: "block",
                  padding: "10px 20px",
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#771100",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0e0dd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content" style={{ display: "flex" }}>
        {/* Left */}
        <div
          className="left-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
            borderRight: "1px solid #ddd",
          }}
        >
          <div className="left-box-header">
            <h2>SUBJECTS</h2>
          </div>
          <div className="left-box-content">
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {subjectNames.map((subject) => (
                <li
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  style={{
                    cursor: "pointer",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    marginBottom: "6px",
                    backgroundColor:
                      selectedSubject === subject ? "#a30000" : "transparent",
                    color: selectedSubject === subject ? "white" : "#771100",
                    fontWeight: selectedSubject === subject ? "bold" : "normal",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSubject !== subject)
                      e.currentTarget.style.backgroundColor = "#f7d2d2";
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSubject !== subject)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center */}
        <div
          className="center-box-dashboard"
          style={{
            flex: 2,
            padding: "20px",
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
          }}
        >
          <div className="center-box-header">
            <h2>Activities</h2>
          </div>
          <div className="center-box-content">
            {selectedSubject ? (
              <>
                <h3>{selectedSubject}</h3>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {subjects[selectedSubject].map(({ id, name, status }) => (
                    <li
                      key={id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        marginBottom: "6px",
                        backgroundColor: "#f7f7f7",
                        borderRadius: "6px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <span>{name}</span>
                      <span
                        style={{
                          color: status === "Turned In" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p style={{ fontWeight: "bold", marginTop: "15px" }}>
                  Remarks:{" "}
                  {subjects[selectedSubject].some(
                    (activity) => activity.status === "Not Turned In"
                  )
                    ? "Incomplete"
                    : "Complete"}
                </p>
              </>
            ) : (
              "Please select a subject from the left."
            )}
          </div>
        </div>

        {/* Right */}
        <div
          className="right-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
          }}
        >
          <div className="right-box-header">
            <h2>Professor Info</h2>
          </div>
          <div className="right-box-content">
            {selectedSubject ? (
              <>
                <p>
                  <strong>Name:</strong>{" "}
                  {professorDetails[selectedSubject].name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {professorDetails[selectedSubject].email}
                </p>

                {/* Message Box */}
                <div style={{ marginTop: "20px" }}>
                  <h4>Address your Concerns:</h4>
                  <textarea
                    rows={4}
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                      fontSize: "14px",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (message.trim()) {
                        console.log(
                          `Message to ${professorDetails[selectedSubject].name}: ${message}`
                        );
                        alert("Message sent!");
                        setMessage("");
                      }
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#a30000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#cc0000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#a30000")
                    }
                  >
                    Send Message
                  </button>
                </div>
              </>
            ) : (
              "Please select a subject to see professor details."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
