import React from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import Button from './components/Button';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleGarageB = () => {
    navigate('/');
  };

  const handleWinnersB = () => {
    navigate('/win');
  };

  return (
    <div className="async-race-container">
      <div className="navigation-container">
        <Button title="Garage" onClick={handleGarageB} className="nav-btn" />
        <Button title="Winners" onClick={handleWinnersB} className="nav-btn" />
      </div>
      <Routes>
        {/* <Route path="" element={<Navigate to="/garage" />} /> */}
        <Route path="/" element={<Garage />} />
        <Route path="/win" element={<Winners />} />
      </Routes>
    </div>
  );
}

export default App;
