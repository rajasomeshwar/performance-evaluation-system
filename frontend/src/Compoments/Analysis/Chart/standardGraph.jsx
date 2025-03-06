import React from "react";
import AnalysisChart from "./AnalysisChart";
import "./chartcss.css";

// Standard Graph Modal
export const StandardGraphModal = ({ setShowStandardGraph }) => {
  return (
    <div className="modal-overlay nested-modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Standard Graph Analysis</h2>
          <button
            onClick={() => setShowStandardGraph(false)}
            className="modal-close-button"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <AnalysisChart
            showStandard={true}
            showDeviation={false}
            showRevisedEmployees={false}
          />
        </div>

        <div className="modal-footer">
          <button
            onClick={() => setShowStandardGraph(false)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Deviation Modal
export const DeviationModal = ({ setShowDeviation }) => {
  return (
    <div className="modal-overlay nested-modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Deviation Analysis</h2>
          <button
            onClick={() => setShowDeviation(false)}
            className="modal-close-button"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <AnalysisChart
            showStandard={false}
            showDeviation={true}
            showRevisedEmployees={false}
          />
        </div>

        <div className="modal-footer">
          <button
            onClick={() => setShowDeviation(false)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Revised Employees Modal
export const RevisedEmployeesModal = ({ setShowRevisedEmployees }) => {
  return (
    <div className="modal-overlay nested-modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Revised Employees</h2>
          <button
            onClick={() => setShowRevisedEmployees(false)}
            className="modal-close-button"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <AnalysisChart
            showStandard={false}
            showDeviation={false}
            showRevisedEmployees={true}
          />
        </div>

        <div className="modal-footer">
          <button
            onClick={() => setShowRevisedEmployees(false)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default {
  StandardGraphModal,
  DeviationModal,
  RevisedEmployeesModal,
};
