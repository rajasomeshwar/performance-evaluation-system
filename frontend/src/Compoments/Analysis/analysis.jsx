import React, { useState } from "react";

import AnalysisChart from "./Chart/AnalysisChart";

import {
  DeviationModal,
  StandardGraphModal,
  RevisedEmployeesModal,
} from "./Chart/standardGraph";

import "./Chart.css";
const AnalysisModal = ({ setShowAnalysisModal }) => {
  const [showStandardGraph, setShowStandardGraph] = useState(false);
  const [showDeviation, setShowDeviation] = useState(false);
  const [showRevisedEmployees, setShowRevisedEmployees] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-container analysis-modal">
        <div className="modal-header">
          <h2>Employee Analysis Dashboard</h2>
          <button
            onClick={() => setShowAnalysisModal(false)}
            className="modal-close-button"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="analysis-buttons">
            <button
              onClick={() => setShowStandardGraph(true)}
              className="analysis-button"
            >
              Standard Graph
            </button>
            <button
              onClick={() => setShowDeviation(true)}
              className="analysis-button"
            >
              Deviation Analysis
            </button>
            <button
              onClick={() => setShowRevisedEmployees(true)}
              className="analysis-button"
            >
              Revised Employees
            </button>
          </div>

          <div className="analysis-preview">
            <AnalysisChart
              showStandard={false}
              showDeviation={false}
              showRevisedEmployees={false}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={() => setShowAnalysisModal(false)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>

      {showStandardGraph && (
        <StandardGraphModal setShowStandardGraph={setShowStandardGraph} />
      )}

      {showDeviation && <DeviationModal setShowDeviation={setShowDeviation} />}

      {showRevisedEmployees && (
        <RevisedEmployeesModal
          setShowRevisedEmployees={setShowRevisedEmployees}
        />
      )}
    </div>
  );
};

export default AnalysisModal;
