import React, { useState } from 'react';
import './Layers.css';

function CheckBoxLayers() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  return (
    <div className="checkbox-list-container">
      <h2>Layers</h2>
      <form>
        <input
          type="checkbox"
          id="zuglinien"
          name="zuglinien"
          value="zuglinien"
          checked={checkedItems.zuglinien || false}
          onChange={handleChange}
        />
        <label htmlFor="zuglinien">Zuglinien</label><br />

        <input
          type="checkbox"
          id="buslinien"
          name="buslinien"
          value="buslinien"
          checked={checkedItems.buslinien || false}
          onChange={handleChange}
        />
        <label htmlFor="buslinien">Buslinien</label><br />

        <input
          type="checkbox"
          id="tramlinien"
          name="tramlinien"
          value="tramlinien"
          checked={checkedItems.tramlinien || false}
          onChange={handleChange}
        />
        <label htmlFor="tramlinien">Tramlinien</label><br />

        <input
          type="checkbox"
          id="schiffelinien"
          name="schiffelinien"
          value="schiffelinien"
          checked={checkedItems.schiffelinien || false}
          onChange={handleChange}
        />
        <label htmlFor="schiffelinien">Schiffelinien</label><br />

        <input
          type="checkbox"
          id="zug"
          name="zug"
          value="zug"
          checked={checkedItems.zug || false}
          onChange={handleChange}
        />
        <label htmlFor="zug">Zug</label><br />

        <input
          type="checkbox"
          id="bus"
          name="bus"
          value="bus"
          checked={checkedItems.bus || false}
          onChange={handleChange}
        />
        <label htmlFor="bus">Bus</label><br />

        <input
          type="checkbox"
          id="tram"
          name="tram"
          value="tram"
          checked={checkedItems.tram || false}
          onChange={handleChange}
        />
        <label htmlFor="tram">Tram</label><br />

        <input
          type="checkbox"
          id="schiffe"
          name="schiffe"
          value="schiffe"
          checked={checkedItems.schiffe || false}
          onChange={handleChange}
        />
        <label htmlFor="schiffe">Schiffe</label><br />
      </form>
    </div>
  );
}

export default CheckBoxLayers;
