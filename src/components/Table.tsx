import React from 'react';
import { Ranking } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TableProps {
  data: Ranking[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="container mt-4">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.rank}>
              <td>{item.rank}</td>
              <td>{item.name}</td>
              <td>{item.score.toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
