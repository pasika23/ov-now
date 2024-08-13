import './App.css';
import React, { useState } from 'react';
import MapWrapper from './components/MapWrapper.jsx';
import Header from './components/Header.jsx';
import InfoPage from './components/InfoPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [features, setFeatures] = useState([]);
  const [bbox, setBbox] = useState('838667,5997631,909982,6036843'); // Default bounding box
  const [zoom, setZoom] = useState(12); // Default zoom level

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<MapWrapper features={features} bbox={bbox} zoom={zoom} />} 
          />
          <Route 
            path="/InfoPage/:trainId/:line_name/:type" 
            element={<InfoPage />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
