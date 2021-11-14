import React from 'react';
import './App.css';
import Home from './Home';
import { Routes, Route, Link } from "react-router-dom";
import Results from './Results';
import Weather from './Weather'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="results" element={<Results />} />
        <Route path="weather" element={<Weather /> } />
      </Routes>
    </div>
  );
}

export default App;
