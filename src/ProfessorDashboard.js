import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProfessorDashboard({ setAuth }) {
  const navigate = useNavigate();
  const professorName = "Derrick Ramos";
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();

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

  const students = [
    {
      id: "1600307",
      name: "Juan Dela Cruz",
      course: "BSCpE",
      subjects: ["Mathematics", "Physics"],
    },
    {
      id: "1600311",
      name: "Maria Santos",
      course: "BSCpE",
      subjects: ["Mathematics", "English"],
    },
    {
      id: "1600315",
      name: "Jose Rizal",
      course: "BSCpE",
      subjects: ["Physics", "English"],
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState({});
  // New state: activities per student per subject (array of strings)
  const [activities, setActivities] = useState({});

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSelectedSubject(null);
    setStatus("");
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);

    if (
      selectedStudent &&
      statuses[selectedStudent.id] &&
      statuses[selectedStudent.id][subject]
    ) {
      setStatus(statuses[selectedStudent.id][subject]);
    } else {
      setStatus("");
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Add or update an activity input
  const handleActivityChange = (index, value) => {
    if (!selectedStudent || !selectedSubject) return;

    const key = selectedStudent.id + "-" + selectedSubject;
    setActivities((prev) => {
      const currentActivities = prev[key] ? [...prev[key]] : [];
      currentActivities[index] = value;
      return {
        ...prev,
        [key]: currentActivities,
      };
    });
  };

  // Add new empty activity input row
  const addActivityRow = () => {
    if (!selectedStudent || !selectedSubject) return;

    const key = selectedStudent.id + "-" + selectedSubject;
    setActivities((prev) => {
      const currentActivities = prev[key] ? [...prev[key]] : [];
      return {
        ...prev,
        [key]: [...currentActivities, ""],
      };
    });
  };

  // Remove an activity row
  const removeActivityRow = (index) => {
    if (!selectedStudent || !selectedSubject) return;

    const key = selectedStudent.id + "-" + selectedSubject;
    setActivities((prev) => {
      const currentActivities = prev[key] ? [...prev[key]] : [];
      currentActivities.splice(index, 1);
      return {
        ...prev,
        [key]: currentActivities,
      };
    });
  };

  const handleSave = () => {
    if (selectedStudent && selectedSubject && status) {
      setStatuses((prev) => ({
        ...prev,
        [selectedStudent.id]: {
          ...prev[selectedStudent.id],
          [selectedSubject]: status,
        },
      }));

      alert(
        `Saved: ${selectedStudent.name} - ${selectedSubject} marked as ${status}`
      );
    }
  };

  // Get activities for currently selected student & subject
  const currentActivities =
    selectedStudent && selectedSubject
      ? activities[selectedStudent.id + "-" + selectedSubject] || []
      : [];

  return (
    <div className="prof-dashboard-root">
      {/* Header */}
      <div
        className="nav prof-navbardashboard"
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
          src="/CPESS.png"
          alt="CPESS Logo"
          style={{ height: "75px", objectFit: "contain" }}
        />

        <img src="/UBLOGO.png" alt="UB Logo" className="logo3" />

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
            {professorName}
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
      <div
        className="prof-dashboard-content"
        style={{
          display: "flex",
          backgroundColor: "#f7f7f7",
          minHeight: "100vh",
        }}
      >
        {/* LEFT: Student Info */}
        <div
          className="prof-left-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2 style={{ color: "#771100" }}>STUDENT INFO</h2>
          {selectedStudent ? (
            <>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Student ID:</strong> {selectedStudent.id}
              </p>
              <p>
                <strong>Course:</strong> {selectedStudent.course}
              </p>
              <p>
                <strong>Subjects:</strong>
              </p>
              <ul style={{ paddingLeft: "20px" }}>
                {selectedStudent.subjects.map((subject) => {
                  const subjectStatus =
                    statuses[selectedStudent.id]?.[subject] || null;

                  return (
                    <li
                      key={subject}
                      onClick={() => handleSelectSubject(subject)}
                      style={{
                        cursor: "pointer",
                        textDecoration:
                          selectedSubject === subject ? "underline" : "none",
                        color: selectedSubject === subject ? "blue" : "black",
                        marginBottom: "2px",
                        fontSize: "13px",
                      }}
                    >
                      {subject} {subjectStatus && `(${subjectStatus})`}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p>Select a student from the right</p>
          )}
        </div>

        {/* CENTER: Edit Status and Activities */}
        <div
          className="prof-center-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2 style={{ color: "#771100" }}>EDIT STATUS</h2>
          {selectedStudent && selectedSubject ? (
            <>
              <p>
                <strong>{selectedStudent.name}</strong> - {selectedSubject}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  flexWrap: "wrap",
                }}
              >
                <label>
                  <input
                    type="radio"
                    value="Complete"
                    checked={status === "Complete"}
                    onChange={handleStatusChange}
                  />{" "}
                  Complete
                </label>
                <label>
                  <input
                    type="radio"
                    value="Incomplete"
                    checked={status === "Incomplete"}
                    onChange={handleStatusChange}
                  />{" "}
                  Incomplete
                </label>

                <button
                  onClick={handleSave}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#771100",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#a30000")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#771100")
                  }
                >
                  Save Status
                </button>
              </div>

              {status === "Incomplete" && (
                <div style={{ marginTop: "30px" }}>
                  <h3 style={{ color: "#771100" }}>Activities to Complete</h3>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            borderBottom: "2px solid #771100",
                            textAlign: "left",
                            padding: "8px",
                            color: "#771100",
                          }}
                        >
                          Activity Description
                        </th>
                        <th
                          style={{
                            borderBottom: "2px solid #771100",
                            padding: "8px",
                            width: "50px",
                            color: "#771100",
                          }}
                        >
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentActivities.length > 0 ? (
                        currentActivities.map((activity, idx) => (
                          <tr key={idx}>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              <input
                                type="text"
                                value={activity}
                                onChange={(e) =>
                                  handleActivityChange(idx, e.target.value)
                                }
                                style={{ width: "100%", padding: "6px" }}
                                placeholder="Enter activity description"
                              />
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              <button
                                onClick={() => removeActivityRow(idx)}
                                style={{
                                  backgroundColor: "#cc0000",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  padding: "4px 8px",
                                }}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={2}
                            style={{ padding: "8px", color: "#888" }}
                          >
                            No activities added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <button
                    onClick={addActivityRow}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      backgroundColor: "#771100",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#a30000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#771100")
                    }
                  >
                    Add Activity
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Select a subject from the left to edit status</p>
          )}
        </div>

        {/* RIGHT: Student List */}
        <div
          className="prof-right-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
          }}
        >
          <h2 style={{ color: "#771100" }}>STUDENTS</h2>
          <ul style={{ paddingLeft: 0 }}>
            {students.map((student) => (
              <li
                key={student.id}
                onClick={() => handleSelectStudent(student)}
                style={{
                  cursor: "pointer",
                  textDecoration:
                    selectedStudent?.id === student.id ? "underline" : "none",
                  color: selectedStudent?.id === student.id ? "blue" : "black",
                  marginBottom: "5px",
                  listStyle: "none",
                }}
              >
                {student.name} ({student.id})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dashboard-footer">
  © 2025 CPESS Student Portal. All rights reserved.
</div>
    </div>
  );
}

export default ProfessorDashboard;
