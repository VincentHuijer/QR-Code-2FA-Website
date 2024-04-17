import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Homepage from './views/Homepage';
import Auth from './views/Auth';
import AuthRegistration from './views/AuthRegistration';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/AuthRegistration" element={<AuthRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
