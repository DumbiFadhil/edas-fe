import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { HistoryItem } from '../types'; // Adjust the import path as needed

const HistoryDetailPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);
  const navigate = useNavigate(); // For navigation after deletion

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryItem>(`http://localhost:8080/api/v1/history/${uuid}`);
        setHistoryItem(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistory();
  }, [uuid]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/history/${uuid}`);
      alert('History item deleted successfully');
      navigate('/history'); // Redirect to history list after deletion
    } catch (error) {
      console.error('Error deleting history item:', error);
      alert('Failed to delete history item');
    }
  };

  if (!historyItem) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">History Detail - {historyItem.uuid}</h1>

      <Button onClick={handleDelete} variant="danger" className="mb-3">
        Delete History
      </Button>

      <h3>EDAS Requests</h3>
      {historyItem.edas_requests.map((request, index) => (
        <div key={index}>
          <h4>Request {index + 1}</h4>
          <h5>Alternatives</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              {request.alternatives.map((alternative, i) => (
                <tr key={i}>
                  <td>{alternative.name}</td>
                  <td>
                    {Object.entries(alternative.scores).map(([key, value]) => (
                      <div key={key}>{key}: {value}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Criteria</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {request.criteria.map((criterion, i) => (
                <tr key={i}>
                  <td>{criterion.name}</td>
                  <td>{criterion.weight}</td>
                  <td>{criterion.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <h3>EDAS Responses</h3>
      {historyItem.edas_responses.map((response, index) => (
        <div key={index}>
          <h4>Response {index + 1}</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {response.ranking.map((ranked, i) => (
                <tr key={i}>
                  <td>{ranked.rank}</td>
                  <td>{ranked.name}</td>
                  <td>{ranked.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <h3>Rankings</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {historyItem.rankings.map((ranked, i) => (
            <tr key={i}>
              <td>{ranked.rank}</td>
              <td>{ranked.name}</td>
              <td>{ranked.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button href="/history" variant="secondary">Back to History List</Button>
    </Container>
  );
};

export default HistoryDetailPage;
