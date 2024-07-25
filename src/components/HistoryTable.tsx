// src/components/HistoryTable.tsx
import React from 'react';
import { HistoryItem } from '../types'; // Make sure to import the correct type

interface HistoryTableProps {
  data: HistoryItem[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No history available.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>UUID</th>
          <th>EDAS Requests</th>
          <th>EDAS Responses</th>
          <th>Rankings</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.uuid}>
            <td>{item.uuid}</td>
            <td>
              {/* Display a summary or relevant details of EDAS Requests */}
              {item.edas_requests.length} requests
            </td>
            <td>
              {/* Display a summary or relevant details of EDAS Responses */}
              {item.edas_responses.length} responses
            </td>
            <td>
              {/* Display a summary or relevant details of Rankings */}
              {item.rankings.length} rankings
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
