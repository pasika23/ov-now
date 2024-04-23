/* global GeoJSON */
import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import MapWrapper from './components/MapWrapper.jsx'
import { DataGrid } from '@mui/x-data-grid';
import Header from './components/Header';
import InfoLinien from './components/InfoLinien';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
  // set intial state
  const [ features, setFeatures ] = useState([])

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock 
  // GeoJson API (read from flat .json file in public directory)
  useEffect(() => {
    // Folgende URL nutzen, falls das Server Backend läuft (FastAPI)
    // fetch('http://localhost:8000/points/')cd
    // Test Geojson Datei, falls das Server Backend nicht läuft (FastAPI)
    fetch('/geojson_points.json')
      .then(response => response.json())
      .then((fetchedFeatures) => {

        // parse fetched geojson into OpenLayers features
        // use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
        const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)

        // set features into state (which will be passed into OpenLayers
        //  map component as props)
        setFeatures(parsedFeatures)

      })

  },[])
  // <MapWrapper features={features} />
  return (
    <div className="App">      
      <Header />
      <InfoLinien /> 
      <MapWrapper features={features} />
    </div>
  )
}
export default App