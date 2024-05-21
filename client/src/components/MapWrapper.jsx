import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { Fill, Stroke, Circle, Style } from 'ol/style.js';
import { FullScreen, ScaleLine, defaults as defaultControls } from 'ol/control.js';
import CheckBoxLayers from './Layers'; 
import BackgroundButton from './backgroundButton';
import Searchbar from './Searchbar'; // Importa il componente Searchbar




function MapWrapper(props) {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [backgroundMap, setBackgroundMap] = useState('Landeskarte-farbe'); // Impostazione predefinita della mappa
  const desktopMinZoom = 8.3;
  const mobileMinZoom = 7.5;
  const [toggleMenu, setToggleMenu] = useState(false);
  const mapElement = useRef();

  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [getBackgroundLayer(), initialFeaturesLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: [919705.97978, 5923388.48616],
        zoom: 1,
        maxZoom: 16,
        minZoom: getMinZoom(),
        extent: getBackgroundExtent(),
      }),
      controls: defaultControls({
        attributionOptions: { collapsible: false },
      }).extend([]),
    });

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);

    return () => initialMap.setTarget("");
  }, []);
  
  const getMinZoom = () => {
    // Imposta il livello di zoom minimo in base al dispositivo
    if (window.matchMedia('(max-width: 1080px)').matches) {
      return mobileMinZoom;
    } else {
      return desktopMinZoom;
    }
  };

  useEffect(() => {
    if (featuresLayer && props.features.length) {
      featuresLayer.setSource(
        new VectorSource({
          features: props.features
        })
      );
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      });
    }
  }, [props.features, featuresLayer, map]);

  const getBackgroundLayer = () => {
    if (backgroundMap === 'osm') {
      return new TileLayer({
        source: new OSM()
      });
    } else if (backgroundMap === 'Landeskarte-farbe') {
      return new TileLayer({
        source: new TileWMS({
          url: 'https://wms.geo.admin.ch/',
          crossOrigin: 'anonymous',
          attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
            'en/home.html">SWISSIMAGE / geo.admin.ch</a>',
          projection: 'EPSG:3857',
          params: {
            'LAYERS': 'ch.swisstopo.pixelkarte-farbe',
            'FORMAT': 'image/jpeg'
          },
          // serverType: 'mapserver'
        })
      });
    } else if (backgroundMap === 'Landeskarte-grau') {
      return new TileLayer({
        source: new TileWMS({
          url: 'https://wms.geo.admin.ch/',
          crossOrigin: 'anonymous',
          attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
            'en/home.html">SWISSIMAGE / geo.admin.ch</a>',
          projection: 'EPSG:3857',
          params: {
            'LAYERS': 'ch.swisstopo.pixelkarte-grau',
            'FORMAT': 'image/jpeg'
          },
          // serverType: 'mapserver'
        })
      });
    } else if (backgroundMap === 'Luftbild') {
      return new TileLayer({
        source: new TileWMS({
          url: 'https://wms.geo.admin.ch/',
          crossOrigin: 'anonymous',
          attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
            'en/home.html">SWISSIMAGE / geo.admin.ch</a>',
          projection: 'EPSG:3857',
          params: {
            'LAYERS': 'ch.swisstopo.images-swissimage',
            'FORMAT': 'image/jpeg'
          },
          // serverType: 'mapserver'
        })
      });
    }
  };

  const getBackgroundExtent = () => {
    // Define the extent based on the background map
    if (backgroundMap === 'osm') {
      return [506943.5, 5652213.5, 1301728.5, 6191092]; // boundigbox for EPSG:3857 (Web Mercator)
    } else if (backgroundMap === 'Landeskarte-farbe') {
      return [506943.5, 5652213.5, 1301728.5, 6191092];
    } else if (backgroundMap === 'Landeskarte-grau') {
      return [506943.5, 5652213.5, 1301728.5, 6191092];
    } else if (backgroundMap === 'Luftbild') {
      return [506943.5, 5652213.5, 1301728.5, 6191092]; 
    }
  };

  const handleSearch = (searchTerm) => {
    // Implementa la logica per la ricerca delle stazioni ferroviarie
    // Utilizzando searchTerm
    // Aggiorna la mappa con i risultati della ricerca
    console.log("Ricerca:", searchTerm);
  };

  // Funzione per gestire il cambio dello sfondo
  const handleBackgroundChange = (mapType) => {
    setBackgroundMap(mapType); // Imposta il nuovo tipo di sfondo
  };

  // Funzione per recuperare i dati geoservizi
  const fetchGeoData = async (mapType) => {
  // Recupera i dati geoservizi in base al tipo di mappa
  try {
    let geoServiceUrl;
    
    // Determina l'URL dei geoservizi in base al tipo di mappa
    switch (mapType) {
      case 'Landeskarte-farbe':
        geoServiceUrl = 'https://wms.geo.admin.ch/?LAYERS=ch.swisstopo.swisstlm3d-wanderwege';
        break;
      case 'Landeskarte-grau':
        geoServiceUrl = 'https://wms.geo.admin.ch/?LAYERS=ch.swisstopo.pixelkarte-grau';
        break;
      case 'Luftbild':
        geoServiceUrl = 'https://wms.geo.admin.ch/?LAYERS=ch.swisstopo.swissimage-product';
        break;
      case 'osm':
        console.log('OpenStreetMap è un servizio basato su vettori. Non è richiesta una chiamata separata per i dati geoservizi.');
        return;
      default:
        // Gestisci il caso di mappa non riconosciuta
        console.error('Tipo di mappa non riconosciuto:', mapType);
        return;
    }
    
    // Effettua la chiamata API per recuperare i dati geoservizi
    const response = await fetch(geoServiceUrl);
    
    // Verifica se la risposta è stata ricevuta correttamente
    if (!response.ok) {
      // Se la risposta non è ok, gestisci l'errore
      throw new Error('Errore nel recupero dei dati geoservizi');
    }
    
    console.log("Dati geoservizi recuperati con successo per la mappa:", mapType);

    } catch (error) {
      // Gestisci gli errori durante il recupero dei dati geoservizi
      console.error('Errore durante il recupero dei dati geoservizi:', error.message);
    }
  };

  return (
    <div style={{ position: 'relative', flex: "100 0 0" }}>
      <div className="searchbar-container">
        <Searchbar onSearch={handleSearch} />
      </div>
      <CheckBoxLayers />
      <div className="container">
      <div className="white-overlay"></div>
      <div ref={mapElement} className="map-container"></div>
      {/* Renderizza il componente BackgroundButton e passa le funzioni necessarie come props */}
      <BackgroundButton
        setBackgroundMap={handleBackgroundChange} // Passa la funzione per cambiare lo sfondo
        toggleMenu={toggleMenu} // Passa lo stato del menu
        fetchGeoData={fetchGeoData} // Passa la funzione per recuperare i dati geoservizi
      />
    </div>
  </div>
);
}

export default MapWrapper;
