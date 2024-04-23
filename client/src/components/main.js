import React, { useState, useEffect } from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import MapWrapper from '../components/MapWrapper'; // Modifica il percorso se necessario
import Header from '../components/Header';
import InfoLinien from '../components/InfoLinien';

function Main() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('/geojson_points.json')
      .then(response => response.json())
      .then((fetchedFeatures) => {
        const wktOptions = {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
        const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)
        setFeatures(parsedFeatures)
      })
  }, []);

  return (
    <div className="App">
      <Header />
      <MapWrapper features={features} />
      <InfoLinien />
    </div>
  );
}

export default Main;
