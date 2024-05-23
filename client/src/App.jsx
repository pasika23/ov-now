import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import MapWrapper from './components/MapWrapper.jsx';
import { DataGrid } from '@mui/x-data-grid';
import Header from './components/Header.jsx';
import InfoPage from './components/InfoPage.jsx';
import GeoJSON from 'ol/format/GeoJSON';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  // set initial state
  const [features, setFeatures] = useState([]);
  const [bbox, setBbox] = useState('838667,5997631,909982,6036843'); // Default bounding box
  const [zoom, setZoom] = useState(12); // Default zoom level
  const mapRef = useRef(); // Ref to access map instance

  // Fetch features from backend on button click
  const fetchFeatures = () => {
    const currentMap = mapRef.current.getMap();
    if (currentMap) {
      const view = currentMap.getView();
      const extent = view.calculateExtent(currentMap.getSize());
      const newBbox = extent.map(coord => Math.round(coord)).join(',');
      const newZoom = Math.round(view.getZoom());

      setBbox(newBbox);
      setZoom(newZoom);

      fetch(`http://localhost:8000/get_all_journey/?bbox=${newBbox}&key=5cc87b12d7c5370001c1d65576ce5bd4be5a4a349ca401cdd7cac1ff&zoom=${newZoom}`)
        .then(response => response.json())
        .then((fetchedFeatures) => {

          // parse fetched geojson into OpenLayers features
          // use options to convert feature from EPSG:4326 to EPSG:3857
          const wktOptions = {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857'
          }
          const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions);

          // set features into state (which will be passed into OpenLayers
          //  map component as props)
          setFeatures(parsedFeatures);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <button onClick={fetchFeatures}>Fetch Features</button> {/* Button to fetch features */}
        <Routes>
          <Route path="/" element={<MapWrapper ref={mapRef} features={features} />} />
          <Route path="/InfoPage" element={<InfoPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
