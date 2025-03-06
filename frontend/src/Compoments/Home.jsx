import React, { useState, useEffect } from "react";

// Table display
import { TableView } from "./Analysis/Tableview";

// Analysis the graph
import AnalysisModal from "./Analysis/analysis";
// error display
import MaintenanceModal from "./Analysis/maintainsModal";
import "./home.css";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    employeeName: "",
    rating: "A",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [EmployeeDelete, setEmployeeDelete] = useState(false);
  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8085/api/employee");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching employees:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8085/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          employeeId: parseInt(employeeData.employeeId),
          employeeName: employeeData.employeeName,
          rating: employeeData.rating,
        }),
      });
      const response1 = await response.json();
      if (response.status === 201) {
        setSubmitStatus({
          type: "success",
          message: "Employee added successfully!",
        });
        setTimeout(() => {
          setShowAddModal(false);
          setSubmitStatus(null);
          setEmployeeData({
            employeeId: "",
            employeeName: "",
            rating: "A",
          });
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to add employee" + JSON.stringify(response1.message),
        });
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus({ type: "error", message: "Error: " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Fetch employees when modal is opened
  useEffect(() => {
    if (showEmployeeModal) {
      fetchEmployees();
    }
  }, [showEmployeeModal]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Employee Management System</h1>

      <div className="dashboard-grid">
        {/* Box  Add Employee */}
        <div className="dashboard-box" onClick={() => setShowAddModal(true)}>
          <h2 className="box-title">Add Employee Details</h2>
          <p className="box-description">
            Click to add a new employee to the database
          </p>
          <div className="box-icon-container">
            <svg
              className="box-icon icon-add"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
        </div>

        {/* Box : View Employees */}
        <div
          className="dashboard-box"
          onClick={() => setShowEmployeeModal(true)}
        >
          <h2 className="box-title">View Employees</h2>
          <p className="box-description">Browse and search employee records</p>
          <div className="box-icon-container">
            <svg
              className="box-icon icon-view"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Box Analysis */}
        <div
          className="dashboard-box"
          onClick={() => setShowAnalysisModal(true)}
        >
          <h2 className="box-title">Analysis</h2>
          <p className="box-description">View employee performance</p>
          <div className="box-icon-container">
            <svg
              className="box-icon icon-update"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
        </div>
        {/* Box : Delete Employee */}
        <div className="dashboard-box" onClick={() => setEmployeeDelete(true)}>
          <h2 className="box-title">Delete Employee</h2>
          <p className="box-description">
            Remove an employee from the database
          </p>
          <div className="box-icon-container">
            <svg
              className="box-icon icon-delete"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Add New Employee</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSubmitStatus(null);
                }}
                className="modal-close-button"
              >
                <svg
                  className="box-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input
                type="number"
                name="employeeId"
                value={employeeData.employeeId}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter employee ID"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={employeeData.employeeName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <select
                name="rating"
                value={employeeData.rating}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>

            {submitStatus && (
              <div
                className={`status-message ${
                  submitStatus.type === "success"
                    ? "status-success"
                    : "status-error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="button-container">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSubmitStatus(null);
                }}
                className="btn btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !employeeData.employeeId ||
                  !employeeData.employeeName
                }
                className={`btn btn-submit ${
                  isSubmitting ||
                  !employeeData.employeeId ||
                  !employeeData.employeeName
                    ? "btn-disabled"
                    : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmployeeModal && (
        <TableView
          setShowEmployeeModal={setShowEmployeeModal}
          isLoading={isLoading}
          error={error}
          employees={employees}
        />
      )}
      {showAnalysisModal && (
        <AnalysisModal setShowAnalysisModal={setShowAnalysisModal} />
      )}
      {EmployeeDelete && (
        <MaintenanceModal
          isOpen={setEmployeeDelete}
          onClose={() => setEmployeeDelete(false)}
        />
      )}
    </div>
  );
}
