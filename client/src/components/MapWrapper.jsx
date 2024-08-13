import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';

const MapWrapper = ({ zoom }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null); // Store the map instance
  const [wmsLayerVisible, setWmsLayerVisible] = useState(false);
  const wmsLayerRef = useRef(null); // Store reference to the WMS layer
  const vectorLayersRef = useRef([]); // Store reference to the Vector layers

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(),  // Base OSM layer
          }),
        ],
        view: new View({
          center: fromLonLat([8.3093, 47.0502]), // Center on a location in Switzerland
          zoom: zoom,
        }),
      });

      console.log("Map initialized. Layers:", mapRef.current.getLayers().getArray());
    }
  }, [zoom]);

  // Function to create the WMS layer
  function createWMSLayer() {
    const baseUrl = 'http://localhost:8080/geoserver/wms';
    const params = {
      'LAYERS': 'ov-now:ch.swisstopo.landeskarte-farbe-10', 
      'VERSION': '1.1.1',
      'FORMAT': 'image/png',
      'TILED': true,
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    console.log('WMS Layer created with URL:', url.toString());

    return new TileLayer({
      source: new TileWMS({
        url: baseUrl,
        params: params,
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
      }),
    });
  }

  useEffect(() => {
    if (mapRef.current) {
      if (wmsLayerVisible) {
        // Create and add the WMS layer if it's not already created
        if (!wmsLayerRef.current) {
          wmsLayerRef.current = createWMSLayer();
        }
        mapRef.current.addLayer(wmsLayerRef.current);
      } else {
        // Remove the WMS layer if it's visible
        if (wmsLayerRef.current) {
          mapRef.current.removeLayer(wmsLayerRef.current);
        }
      }
    }
  }, [wmsLayerVisible]);

  const fetchWFSLayer = () => {
    const extent = mapRef.current.getView().calculateExtent(mapRef.current.getSize());
    const bbox = extent.join(',');

    fetch(`http://localhost:8000/wfs?typename=ov-now:magosm_railways_line&srsname=EPSG:3857&output_format=application/json&bbox=${bbox}`)
      .then(response => response.json())
      .then(data => {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data, {
            featureProjection: 'EPSG:3857',
          }),
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, 1)',  // Set a clear color with full opacity
              width: 3,  // Increase the stroke width
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.5)',  // Set a semi-transparent fill color
            }),
          }),
        });

        mapRef.current.addLayer(vectorLayer);
        vectorLayersRef.current.push(vectorLayer); // Store reference to the layer

        console.log("Vector Layer added:", vectorLayer);
        console.log("Layers on the map:", mapRef.current.getLayers().getArray());

        // Adjust map to the extent of the vector layer
        const extent = vectorSource.getExtent();
        if (extent) {
          mapRef.current.getView().fit(extent, { duration: 1000 });
        }
      })
      .catch(error => console.error('Error fetching WFS data:', error));
  };

  const removeAllVectorLayers = () => {
    vectorLayersRef.current.forEach(layer => {
      mapRef.current.removeLayer(layer);
    });
    vectorLayersRef.current = []; // Clear the stored references
    console.log("All vector layers removed.");
  };

  return (
    <div>
      <h2>GeoServereinbindung</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={wmsLayerVisible}
            onChange={(e) => setWmsLayerVisible(e.target.checked)}
          />
          Landeskarte einblenden
        </label>
        <button onClick={fetchWFSLayer}>
          Zuglinien einblenden
        </button>
        <button onClick={removeAllVectorLayers}>
          Zuglinien löschen
        </button>
      </div>
      <div ref={mapElement} style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default MapWrapper;
