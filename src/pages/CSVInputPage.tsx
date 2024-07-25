import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Table from '../components/Table';
import { Criterion, Alternative, Ranking } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';

const CSVInputPage: React.FC = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [ranking, setRanking] = useState<Ranking[] | null>(null);

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const parsedData = Papa.parse<Criterion>(e.target.value.trim(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.trim(),
      transform: (value, header) => {
        if (header === 'weight') {
          const num = parseFloat(value);
          return isNaN(num) ? 0 : num; // Ensure valid number
        }
        return value;
      }
    });
  
    // Filter out invalid entries if needed
    const formattedCriteria = parsedData.data.filter(item => item.weight !== 0).map(item => ({
      name: item.name,
      type: item.type,
      weight: item.weight,
    }));
  
    setCriteria(formattedCriteria);
  };
  

  const handleAlternativesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const parsedData = Papa.parse<Record<string, string>>(e.target.value.trim(), {
      header: true,
      skipEmptyLines: true,
    });
  
    // Process alternatives
    const formattedAlternatives: Alternative[] = parsedData.data.map((item, index) => {
      const scores: Record<string, number> = {};
      
      Object.keys(item).forEach(key => {
        if (key !== 'Name') {
          const score = parseFloat(item[key]);
          scores[key] = isNaN(score) ? 0 : score; // Ensure valid number
        }
      });
      
      return {
        code: `A${index + 1}`,  // Assigning code based on index
        name: item.Name,       // The name field is correctly set here
        scores,                // The scores object contains only numerical values
      };
    });
  
    setAlternatives(formattedAlternatives);
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { criteria, alternatives };
    console.log(data);
    try {
      const response = await axios.post<{ ranking: Ranking[] }>('http://localhost:8080/api/v1/edas', data);
      setRanking(response.data.ranking);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">CSV Input Page</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <h2>Criteria</h2>
          <textarea
            className="form-control"
            rows={5}
            onChange={handleCriteriaChange}
            placeholder="Enter criteria in CSV format"
          />
        </div>
        <div className="mb-3">
          <h2>Alternatives</h2>
          <textarea
            className="form-control"
            rows={5}
            onChange={handleAlternativesChange}
            placeholder="Enter alternatives in CSV format"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {ranking && <Table data={ranking} />}
    </div>
  );
};

export default CSVInputPage;
