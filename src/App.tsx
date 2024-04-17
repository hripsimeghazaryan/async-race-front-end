/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Routes, Route, Navigate, useNavigate,
} from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import Button from './components/Button';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleGarageB = () => {
    navigate('/garage');
  };

  const handleWinnersB = () => {
    navigate('/winners');
  };

  return (
    <div className="async-race-container">
      <div className="navigation-container">
        <Button title="Garage" onClick={handleGarageB} className="nav-btn" />
        <Button title="Winners" onClick={handleWinnersB} className="nav-btn" />
      </div>
      <Routes>
        <Route path="" element={<Navigate to="/garage" />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
}

export default App;
