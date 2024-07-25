import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const MenuPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4">EDAS Decision Support System</h1>
      <Row>
        <Col md={4} className="mb-3">
          <Link to="/preset-form">
            <Button variant="primary" className="w-100">Preset Criteria</Button>
          </Link>
        </Col>
        <Col md={4} className="mb-3">
          <Link to="/csv-input">
            <Button variant="secondary" className="w-100">Manual CSV Input</Button>
          </Link>
        </Col>
        <Col md={4} className="mb-3">
          <Link to="/history">
            <Button variant="success" className="w-100">View History</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuPage;
