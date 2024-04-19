// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Homepage from './views/Homepage';
import Auth from './views/Auth';
import AuthRegistration from './views/AuthRegistration';
import { SessionProvider } from './views/components/contexts/SessionContext';
import { EnrollMFA } from './views/components/EnrollMFA';


function App() {
  const [session, setSession] = useState(null);

  return (
    <SessionProvider value={{ session, setSession }}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/authRegistration" element={<AuthRegistration />} />
          <Route path="/enrollMFA" element={<EnrollMFA/>}/>
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
