import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import AddJob from './components/pages/AddJob';
import EditJob from './components/pages/EditJob';
import NotFound from './components/pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/edit/:id" element={<EditJob />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Student Job Tracker</p>
      </footer>
    </div>
  );
}

export default App;