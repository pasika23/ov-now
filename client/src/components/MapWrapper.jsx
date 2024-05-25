import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useNavigate } from 'react-router-dom';
import { Fill, Stroke, Style } from 'ol/style.js';
import { FullScreen, ScaleLine, defaults as defaultControls } from 'ol/control.js';
import GeoJSON from 'ol/format/GeoJSON';
import CheckBoxLayers from './Layers';
import BackgroundButton from './backgroundButton';
import Searchbar from './Searchbar';

const MapWrapper = forwardRef((props, ref) => {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [backgroundMap, setBackgroundMap] = useState('Landeskarte-farbe');
  const desktopMinZoom = 8.3;
  const mobileMinZoom = 7.5;
  const [toggleMenu, setToggleMenu] = useState(false);
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  const navigate = useNavigate();

  const featureStyle = (feature) => {
    const type = feature.get('type');
    let mainStrokeStyle;
    let haloStrokeStyle = new Stroke({
      color: 'rgba(255, 255, 255, 0.5)', // Transparent halo color
      width: 10, // Width of the halo
    });

    switch (type) {
      case 'rail':
        mainStrokeStyle = new Stroke({
          color: 'black',
          width: 3,
        });
        break;
      case 'bus':
        mainStrokeStyle = new Stroke({
          color: 'black',
          width: 3,
          lineDash: [5, 15], // Dashed line
        });
        break;
      case 'tram':
        mainStrokeStyle = new Stroke({
          color: 'black',
          width: 6,
          lineCap: 'butt', // Square ends
        });
        return [
          new Style({
            stroke: haloStrokeStyle,
            zIndex: 2, // Ensure halo is underneath feature but above overlay
          }),
          new Style({
            stroke: mainStrokeStyle,
            zIndex: 3, // Feature layer
          }),
          new Style({
            geometry: feature.getGeometry().clone().translate(2, 0), // Create the second line slightly shifted
            stroke: haloStrokeStyle,
            zIndex: 2,
          }),
          new Style({
            geometry: feature.getGeometry().clone().translate(2, 0),
            stroke: mainStrokeStyle,
            zIndex: 3,
          })
        ];
      default:
        mainStrokeStyle = new Stroke({
          color: 'black',
          width: 3,
        });
    }

    return [
      new Style({
        stroke: haloStrokeStyle,
        zIndex: 2,
      }),
      new Style({
        stroke: mainStrokeStyle,
        zIndex: 3,
      })
    ];
  };

  useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: featureStyle, // Usa la funzione di stile qui
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

    initialMap.on('click', (event) => {
      initialMap.forEachFeatureAtPixel(event.pixel, (feature) => {
        const type = feature.getId();
        navigate(`/InfoPage/${type}`);
      });
    });

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);

    return () => {
      if (initialMap) {
        initialMap.setTarget(null);
      }
    };
  }, []);

  const getMinZoom = () => {
    return window.matchMedia('(max-width: 1080px)').matches ? mobileMinZoom : desktopMinZoom;
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

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current
  }));

  const getBackgroundLayer = () => {
    switch (backgroundMap) {
      case 'osm':
        return new TileLayer({ source: new OSM() });
      case 'Landeskarte-farbe':
      case 'Landeskarte-grau':
      case 'Luftbild':
        return new TileLayer({
          source: new TileWMS({
            url: 'https://wms.geo.admin.ch/',
            crossOrigin: 'anonymous',
            attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/en/home.html">SWISSIMAGE / geo.admin.ch</a>',
            projection: 'EPSG:3857',
            params: {
              'LAYERS': getLayerName(backgroundMap),
              'FORMAT': 'image/jpeg'
            },
          })
        });
      default:
        return new TileLayer({ source: new OSM() });
    }
  };

  const getLayerName = (mapType) => {
    switch (mapType) {
      case 'Landeskarte-farbe':
        return 'ch.swisstopo.pixelkarte-farbe';
      case 'Landeskarte-grau':
        return 'ch.swisstopo.pixelkarte-grau';
      case 'Luftbild':
        return 'ch.swisstopo.images-swissimage';
      default:
        return '';
    }
  };

  const getBackgroundExtent = () => {
    return [506943.5, 5652213.5, 1301728.5, 6191092];
  };

  const handleSearch = (searchTerm) => {
    console.log("Ricerca:", searchTerm);
  };

  const handleBackgroundChange = (mapType) => {
    setBackgroundMap(mapType);
  };

  const fetchGeoData = async (mapType) => {
    try {
      let geoServiceUrl;
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
          console.error('Tipo di mappa non riconosciuto:', mapType);
          return;
      }

      const response = await fetch(geoServiceUrl);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati geoservizi');
      }
      console.log("Dati geoservizi recuperati con successo per la mappa:", mapType);

    } catch (error) {
      console.error('Errore durante il recupero dei dati geoservizi:', error.message);
    }
  };

  useEffect(() => {
    if (map) {
      const layers = map.getLayers().getArray();
      layers[0] = getBackgroundLayer();
      map.render();
    }
  }, [backgroundMap, map]);

  return (
    <div style={{ position: 'relative', flex: "100 0 0" }}>
      <div className="searchbar-container">
        <Searchbar onSearch={handleSearch} />
      </div>
      <CheckBoxLayers />
      <div className="container">
        <div className="white-overlay" style={{ zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', pointerEvents: 'none' }}></div>
        <div ref={mapElement} className="map-container"></div>
        <BackgroundButton
          setBackgroundMap={handleBackgroundChange}
          toggleMenu={toggleMenu}
          fetchGeoData={fetchGeoData}
        />
      </div>
    </div>
  );
});

export default MapWrapper;
