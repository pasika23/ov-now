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
import { toStringXY } from 'ol/coordinate';
import { Fill, Stroke, Circle, Style } from 'ol/style.js';
import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction.js';
import { FullScreen, ScaleLine, defaults as defaultControls } from 'ol/control.js';
import LayersIcon from '@mui/icons-material/Layers';
import Landeskarte_farbe from '../Image/Landeskarte_farbe.png';
import Landeskarte_grau from '../Image/Landeskarte_grau.png';
import Bild_Luftbild from '../Image/Bild_Luftbild.png';
import Bild_osm from '../Image/Bild_osm.png'


function MapWrapper(props) {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCoord, setSelectedCoord] = useState();
  const [backgroundMap, setBackgroundMap] = useState('Landeskarte-farbe'); // Impostazione predefinita della mappa
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const desktopMinZoom = 8.3;
  const mobileMinZoom = 7.5;

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
      //interactions: defaultInteractions().extend([new DragRotateAndZoom()])
    });

    initialMap.on('click', handleMapClick);

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);

    // Salva la vista corrente
    setCurrentView(initialMap.getView().getCenter(), initialMap.getView().getZoom());

    return () => initialMap.setTarget("");
  }, []);

  const getMinZoom = () => {
    // Imposta il livello di zoom minimo in base al dispositivo
    if (window.matchMedia('(max-width: 768px)').matches) {
      return mobileMinZoom;
    } else {
      return desktopMinZoom;
    }
  };

  useEffect(() => {
    if (props.features.length) {
      featuresLayer.setSource(
        new VectorSource({
          features: props.features
        })
      );
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      });
    }
  }, [props.features]);

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    //const transformedCoord = transform(clickedCoord, 'EPSG:4326', 'EPSG:3857');
    //setSelectedCoord(transormedCoord);
    //console.log(transormedCoord);
    setSelectedCoord(clickedCoord);
    console.log(clickedCoord);
  };

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
    //Laden des WMTS von geo.admin.ch > Hintergrungkarte in der Applikation
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

  const handleBackgroundChange = (event) => {
    // Salva la vista corrente prima del cambio dello sfondo
    const currentCenter = map.getView().getCenter();
    const currentZoom = map.getView().getZoom();
    setCurrentView({ center: currentCenter, zoom: currentZoom });

    const selectedValue = event.target.value;
    setBackgroundMap(selectedValue);
    const extent = getBackgroundExtent();
    if (map) {
      map.getView().fit(extent, map.getSize());
    };

    toggleMenu();

    // Ripristina la vista corrente dopo il cambio dello sfondo
    if (currentView) {
      map.getView().setCenter(currentView.center);
      map.getView().setZoom(currentView.zoom);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  const backgroundImageSrc = (() => {
    switch (backgroundMap) {
      case 'Landeskarte-farbe':
        return Landeskarte_farbe;
      case 'Landeskarte-grau':
        return Landeskarte_grau;
      case 'Luftbild':
        return Bild_Luftbild;
      case 'osm':
        return Bild_osm;
      default:
        return Landeskarte_farbe;
    }
  })();

  return (
    <div>
      <div className="map-fullscreen-container">
        <div ref={mapElement} className="map-container"></div>
        <div className="clicked-coord-label">
          <p>{selectedCoord ? toStringXY(selectedCoord, 5) : ''}</p>
        </div>
      </div>
      <div className="background-container" onClick={toggleMenu}>
        <img src={backgroundImageSrc} width="50" height="50" onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className="background-select">
          <label htmlFor="background-map">Background Map:</label>
          <div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Landeskarte-farbe' } })}>
              <p>Landeskarte farben</p>
              <img src={Landeskarte_farbe} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Landeskarte-grau' } })}>
              <p>Landeskarte grau</p>
              <img src={Landeskarte_grau} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Luftbild' } })}>
              <p>Luftbild</p>
              <img src={Bild_Luftbild} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'osm' } })}>
              <p>OpenStreetMap</p>
              <img src={Bild_osm} width="50" height="50" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapWrapper;
