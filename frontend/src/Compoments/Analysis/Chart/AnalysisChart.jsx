import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AnalysisChart = ({
  showStandard = false,
  showDeviation = false,
  showRevisedEmployees = false,
}) => {
  const [data, setData] = useState([]);
  const [revisedEmployees, setRevisedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8085/api/analysis")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        const actualPercentage = result.actualPercentage;
        const deviationPercentage = result.deviationPercentage;
        const standardPercentage = { A: 10, B: 20, C: 40, D: 20, E: 10 };

        const formattedData = Object.keys(actualPercentage).map(
          (category, index) => ({
            category,
            x: index + 1,
            standard: standardPercentage[category],
            actual: actualPercentage[category],
            deviation: deviationPercentage[category],
          })
        );

        setData(formattedData);
        setRevisedEmployees(result.revisedEmployees || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading analysis data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="chart-container">
      {!showStandard && !showDeviation && !showRevisedEmployees && (
        <div className="analysis-summary">
          <h3>Analysis Summary</h3>
          <p>Click on one of the buttons above to view detailed analysis.</p>
          <div className="summary-stats">
            <div className="stat-card">
              <h4>Total Categories</h4>
              <div className="stat-value">{data.length}</div>
            </div>
            <div className="stat-card">
              <h4>Highest Actual</h4>
              <div className="stat-value">
                {data.length > 0
                  ? `${
                      data.reduce((max, item) =>
                        item.actual > max.actual ? item : max
                      ).category
                    }: ${
                      data.reduce((max, item) =>
                        item.actual > max.actual ? item : max
                      ).actual
                    }%`
                  : "N/A"}
              </div>
            </div>
            <div className="stat-card">
              <h4>Highest Deviation</h4>
              <div className="stat-value">
                {data.length > 0
                  ? `${
                      data.reduce((max, item) =>
                        Math.abs(item.deviation) > Math.abs(max.deviation)
                          ? item
                          : max
                      ).category
                    }: ${
                      data.reduce((max, item) =>
                        Math.abs(item.deviation) > Math.abs(max.deviation)
                          ? item
                          : max
                      ).deviation
                    }%`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}

      {showStandard && (
        <div className="standard-chart">
          <h3>Standard vs Actual Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="x"
                tickFormatter={(tick) =>
                  data.find((d) => d.x === tick)?.category || tick
                }
                label={{
                  value: "Category",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Percentage",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="standard"
                stroke="green"
                name="Standard Percentage"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="red"
                name="Actual Percentage"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {showDeviation && (
        <div className="deviation-chart">
          <h3>Deviation Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="x"
                tickFormatter={(tick) =>
                  data.find((d) => d.x === tick)?.category || tick
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="deviation"
                stroke="red"
                fill="rgba(255, 0, 0, 0.5)"
                name="Deviation Percentage"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {showRevisedEmployees && (
        <div className="revised-employees">
          <h3>Revised Employees</h3>
          {revisedEmployees.length > 0 ? (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {revisedEmployees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No revised employees found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisChart;
