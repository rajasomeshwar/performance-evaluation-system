import React from "react";
// import "./TableView.css"; // Import the CSS file
import "./Tableview.css";
export const TableView = ({
  setShowEmployeeModal,
  isLoading,
  error,
  employees,
}) => (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-header">
        <h2>Employee Records</h2>
        <button
          onClick={() => setShowEmployeeModal(false)}
          className="modal-close-button"
        >
          ×
        </button>
      </div>

      <div className="modal-body">
        {isLoading ? (
          <div className="loading-message">Loading employees...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.rating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data-message">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="modal-footer">
        <button
          onClick={() => setShowEmployeeModal(false)}
          className="btn btn-primary"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
