import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import CSVInputPage from './pages/CSVInputPage';
import PresetFormPage from './pages/PresetFormPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/csv-input" element={<CSVInputPage />} />
        <Route path="/preset-form" element={<PresetFormPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:uuid" element={<HistoryDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
