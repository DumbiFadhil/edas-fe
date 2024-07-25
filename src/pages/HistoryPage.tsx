// src/pages/HistoryPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoryItem } from '../types'; // Define the type in your types file
import HistoryTable from '../components/HistoryTable';

const HistoryPage: React.FC = () => {
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryItem[]>('http://localhost:8080/api/v1/history');
        setHistories(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Past Histories</h1>
      {histories.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <HistoryTable data={histories} />
      )}
    </div>
  );
};

export default HistoryPage;
