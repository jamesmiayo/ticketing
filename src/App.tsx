import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/navigation/NavBar';
import Dashboard from './modules/Dashboard/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Other routes can go here, e.g., individual ticket views */}
      </Routes>
    </Router>
  );
};

export default App;
