import React from 'react';
import './App.css';
import Home from './Home';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="results" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
