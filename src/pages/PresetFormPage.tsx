import React, { useState } from 'react';
import axios from 'axios';
import { Ranking } from '../types';
import Table from '../components/Table';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const presetCriteria = [
  { name: "Rata - rata UKT (non-Mandiri)", type: "cost", weight: 0.1380597015 },
  { name: "Akreditasi", type: "benefit", weight: 0.1455223881 },
  { name: "Kerjasama Internasional", type: "benefit", weight: 0.1007462687 },
  { name: "Jumlah UKM/KSM/ORMAWA", type: "benefit", weight: 0.0671641791 },
  { name: "Rasio Dosen / Mahasiswa", type: "benefit", weight: 0.07089552239 },
  { name: "Persentase penerimaan mahasiswa", type: "benefit", weight: 0.08582089552 },
  { name: "Jumlah publikasi dan citasi", type: "benefit", weight: 0.1082089552 },
  { name: "Skor QS world ranking", type: "benefit", weight: 0.09701492537 },
  { name: "World rank (QS world ranking)", type: "cost", weight: 0.09328358209 },
  { name: "World rank (webometrics)", type: "cost", weight: 0.09328358209 }
];

const PresetFormPage: React.FC = () => {
  const [numAlternatives, setNumAlternatives] = useState(1);
  const [alternatives, setAlternatives] = useState<{ code: string; name: string; scores: Record<string, number> }[]>([]);
  const [ranking, setRanking] = useState<Ranking[] | null>(null);

  const handleNumAlternativesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumAlternatives(value);
    setAlternatives(Array.from({ length: value }, () => ({ code: '', name: '', scores: presetCriteria.reduce((acc, curr) => ({ ...acc, [curr.name]: 0 }), {}) })));
  };

  const handleAlternativeChange = (index: number, field: string, value: string) => {
    const updatedAlternatives = [...alternatives];
    if (field === 'code' || field === 'name') {
      updatedAlternatives[index][field] = value;
    } else {
      updatedAlternatives[index].scores[field] = parseFloat(value);
    }
    setAlternatives(updatedAlternatives);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { criteria: presetCriteria, alternatives };
    console.log(data);
    try {
      const response = await axios.post<{ ranking: Ranking[] }>('http://localhost:8080/api/v1/edas', data);
      setRanking(response.data.ranking);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Preset Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Number of Alternatives:</Form.Label>
          <Form.Control
            type="number"
            value={numAlternatives}
            onChange={handleNumAlternativesChange}
            min="1"
          />
        </Form.Group>
        <Row>
          {alternatives.map((alt, index) => (
            <Col key={index} md={4} lg={3} className="mb-4">
              <div className="p-3 border rounded">
                <h5>Alternative {index + 1}</h5>
                <Form.Group className="mb-2">
                  <Form.Label>Code:</Form.Label>
                  <Form.Control
                    type="text"
                    value={alt.code}
                    onChange={(e) => handleAlternativeChange(index, 'code', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={alt.name}
                    onChange={(e) => handleAlternativeChange(index, 'name', e.target.value)}
                  />
                </Form.Group>
                {presetCriteria.map((criterion, cIndex) => (
                  <Form.Group key={cIndex} className="mb-2">
                    <Form.Label>
                      {criterion.name}:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={alt.scores[criterion.name] || 0}
                      onChange={(e) => handleAlternativeChange(index, criterion.name, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </div>
            </Col>
          ))}
        </Row>
        <Button type="submit" variant="primary" className="mt-4">Submit</Button>
      </Form>
      {ranking && <Table data={ranking} />}
    </Container>
  );
};

export default PresetFormPage;
