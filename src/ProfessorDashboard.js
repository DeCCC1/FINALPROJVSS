import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProfessorDashboard({ setAuth }) {
  const navigate = useNavigate();
  const professorName = "Derrick Ramos";
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const [subjectList, setSubjectList] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [selectedSubjectFromList, setSelectedSubjectFromList] = useState(null);
  const [subjectStudents, setSubjectStudents] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState({}); // {subject: {studentId: status}}
  const [activities, setActivities] = useState({}); // { "subject-studentId": [activity1, ...] }

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

  // Filter out the specified students
  const filteredStudents = students.filter(
    (student) => !["1600307", "1600311", "1600315"].includes(student.id)
  );

  const handleSelectSubjectFromList = (subject) => {
    setSelectedSubjectFromList(subject);
    setShowAddStudentForm(false);
    setSelectedStudent(null);
    setStatus("");
  };

  const handleAddStudentToSubject = (e) => {
    e.preventDefault();
    const form = e.target;
    const studentName = form.studentName.value.trim();
    const studentId = form.studentId.value.trim();

    if (!studentName || !studentId) return;

    setSubjectStudents((prev) => {
      const currentStudents = prev[selectedSubjectFromList] || [];
      if (currentStudents.some((s) => s.id === studentId)) {
        alert("Student ID already exists for this subject.");
        return prev;
      }
      return {
        ...prev,
        [selectedSubjectFromList]: [
          ...currentStudents,
          { id: studentId, name: studentName },
        ],
      };
    });

    form.reset();
    setShowAddStudentForm(false);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    const subjectStatus =
      statuses[selectedSubjectFromList] &&
      statuses[selectedSubjectFromList][student.id];
    setStatus(subjectStatus || "");

    // Load saved activities or empty
    const key = selectedSubjectFromList + "-" + student.id;
    const savedActivities = activities[key] || [];
    setCurrentActivities(savedActivities);
  };

  // Activities for current student/subject in editing form
  const [currentActivities, setCurrentActivities] = useState([]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    // Clear activities if status changed to Complete
    if (newStatus === "Complete") {
      setCurrentActivities([]);
    }
  };

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...currentActivities];
    updatedActivities[index] = value;
    setCurrentActivities(updatedActivities);
  };

  const addActivityRow = () => {
    setCurrentActivities((prev) => [...prev, ""]);
  };

  const removeActivityRow = (index) => {
    const updatedActivities = [...currentActivities];
    updatedActivities.splice(index, 1);
    setCurrentActivities(updatedActivities);
  };

  const canSave = () => {
    if (!selectedStudent || !selectedSubjectFromList) return false;
    const currentStatus =
      statuses[selectedSubjectFromList] &&
      statuses[selectedSubjectFromList][selectedStudent.id];
    // Save if status changed or activities changed (only when Incomplete)
    if (status !== currentStatus) return true;
    if (status === "Incomplete") {
      const key = selectedSubjectFromList + "-" + selectedStudent.id;
      const savedActivities = activities[key] || [];
      // Compare arrays to detect changes
      if (savedActivities.length !== currentActivities.length) return true;
      for (let i = 0; i < savedActivities.length; i++) {
        if (savedActivities[i] !== currentActivities[i]) return true;
      }
    }
    return false;
  };

  const handleSaveStatus = () => {
    if (!canSave()) return;

    setStatuses((prev) => {
      const existingStatus = prev[selectedSubjectFromList] || {};
      return {
        ...prev,
        [selectedSubjectFromList]: {
          ...existingStatus,
          [selectedStudent.id]: status,
        },
      };
    });

    if (status === "Incomplete") {
      const key = selectedSubjectFromList + "-" + selectedStudent.id;
      setActivities((prev) => ({
        ...prev,
        [key]: currentActivities.filter((a) => a.trim() !== ""),
      }));
    } else {
      // On Complete, clear activities for this student+subject
      const key = selectedSubjectFromList + "-" + selectedStudent.id;
      setActivities((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
      setCurrentActivities([]);
    }

    alert(
  `Status for ${selectedStudent.name} in ${selectedSubjectFromList} saved as '${status}';`
    );
  };

  const handleRemoveStudentFromSubject = (studentIdToRemove) => {
    if (!selectedSubjectFromList) return;

    setSubjectStudents((prev) => {
      const currentStudents = prev[selectedSubjectFromList] || [];
      const newStudents = currentStudents.filter(
        (s) => s.id !== studentIdToRemove
      );
      return {
        ...prev,
        [selectedSubjectFromList]: newStudents,
      };
    });

    if (selectedStudent && selectedStudent.id === studentIdToRemove) {
      setSelectedStudent(null);
      setStatus("");
      setCurrentActivities([]);
    }
  };

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
        {/* LEFT: Subjects List on top, Add Subject below */}
        <div
          className="prof-left-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2 style={{ color: "#771100" }}>SUBJECTS LIST</h2>
          {subjectList.length > 0 ? (
            <ul style={{ paddingLeft: "20px" }}>
              {subjectList.map((subj, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    cursor: "pointer",
                    textDecoration:
                      selectedSubjectFromList === subj ? "underline" : "none",
                    color: selectedSubjectFromList === subj ? "blue" : "black",
                  }}
                  onClick={() => {
                    handleSelectSubjectFromList(subj);
                    setSelectedStudent(null);
                    setStatus("");
                    setCurrentActivities([]);
                  }}
                >
                  {subj}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#999" }}>No subjects added yet.</p>
          )}

          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#771100" }}>ADD SUBJECT</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newSubject = e.target.subject.value.trim();
                if (!newSubject || subjectList.includes(newSubject)) return;

                setSubjectList((prev) => [...prev, newSubject]);
                e.target.reset();
              }}
            >
              <input
                type="text"
                name="subject"
                placeholder="Enter new subject"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#771100",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Add Subject
              </button>
            </form>
          </div>
        </div>

        {/* CENTER: Status form with activities if Incomplete */}
        <div
          className="prof-center-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          {selectedStudent && selectedSubjectFromList ? (
            <>
              <h2 style={{ color: "#771100" }}>
                {selectedStudent.name} - {selectedSubjectFromList}
              </h2>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <label style={{ marginRight: "15px" }}>
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
              </div>

              {status === "Incomplete" && (
                <div style={{ marginTop: "20px" }}>
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

              {canSave() && (
                <button
                  onClick={handleSaveStatus}
                  style={{
                    marginTop: "20px",
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
                  Save
                </button>
              )}
            </>
          ) : (
            <p>Select a student from the right to edit their status</p>
          )}
        </div>

        {/* RIGHT: List students for selected subject with status, and add students UI */}
        <div
          className="prof-right-box-dashboard"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff5f0",
            overflowY: "auto",
          }}
        >
          {selectedSubjectFromList ? (
            <>
              <h2 style={{ color: "#771100" }}>
                Students in {selectedSubjectFromList}
              </h2>
              {!showAddStudentForm && (
                <button
                  onClick={() => setShowAddStudentForm(true)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#771100",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "20px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#a30000")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#771100")
                  }
                >
                  Add Students
                </button>
              )}

              {showAddStudentForm && (
                <form onSubmit={handleAddStudentToSubject}>
                  <div style={{ marginBottom: "10px" }}>
                    <label
                      htmlFor="studentName"
                      style={{ display: "block", marginBottom: "4px" }}
                    >
                      Student Name
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      required
                      placeholder="Enter student name"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label
                      htmlFor="studentId"
                      style={{ display: "block", marginBottom: "4px" }}
                    >
                      Student ID
                    </label>
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      required
                      placeholder="Enter student ID"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#771100",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      marginRight: "10px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#a30000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#771100")
                    }
                  >
                    Add Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddStudentForm(false)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#ccc",
                      color: "#333",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#aaa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ccc")
                    }
                  >
                    Cancel
                  </button>
                </form>
              )}

              {subjectStudents[selectedSubjectFromList] &&
              subjectStudents[selectedSubjectFromList].length > 0 ? (
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                  {subjectStudents[selectedSubjectFromList].map((student) => {
                    const studentStatus =
                      statuses[selectedSubjectFromList] &&
                      statuses[selectedSubjectFromList][student.id];
                    return (
                      <li
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        style={{
                          marginBottom: "8px",
                          backgroundColor:
                            selectedStudent?.id === student.id
                              ? "#d6eaff"
                              : "#f9f9f9",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow:
                            selectedStudent?.id === student.id
                              ? "0 0 8px #3399ff"
                              : "none",
                          color:
                            studentStatus === "Complete"
                              ? "green"
                              : studentStatus === "Incomplete"
                              ? "red"
                              : "black",
                          fontWeight:
                            selectedStudent?.id === student.id
                              ? "bold"
                              : "normal",
                        }}
                        title={
                          studentStatus
                            ? 'Status: ${studentStatus}'
                            : "Click to edit status"
                        }
                      >
                        <span>
                          {student.name} ({student.id})
                          {studentStatus ? ` (${studentStatus})` : ""}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveStudentFromSubject(student.id);
                          }}
                          style={{
                            backgroundColor: "#cc0000",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "4px 8px",
                            marginLeft: "10px",
                          }}
                          title="Remove Student"
                        >
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p style={{ color: "#999" }}>
                  No students added yet for this subject.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 style={{ color: "#771100" }}>STUDENTS</h2>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    onClick={() =>
                      alert("Select a subject first to edit student status")
                    }
                    style={{
                      cursor: "not-allowed",
                      color: "#999",
                      marginBottom: "5px",
                    }}
                  >
                    {student.name} ({student.id})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="dashboard-footer">
  © 2025 CPESS Student Portal. All rights reserved.
</div>
    </div>
  );
}

export default ProfessorDashboard;
