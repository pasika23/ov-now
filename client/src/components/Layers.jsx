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
      <h2>Seleziona le opzioni desiderate:</h2>
      <form>
        <input
          type="checkbox"
          id="opzione1"
          name="opzione1"
          value="opzione1"
          checked={checkedItems.opzione1 || false}
          onChange={handleChange}
        />
        <label htmlFor="opzione1">Opzione 1</label><br />

        <input
          type="checkbox"
          id="opzione2"
          name="opzione2"
          value="opzione2"
          checked={checkedItems.opzione2 || false}
          onChange={handleChange}
        />
        <label htmlFor="opzione2">Opzione 2</label><br />

        <input
          type="checkbox"
          id="opzione3"
          name="opzione3"
          value="opzione3"
          checked={checkedItems.opzione3 || false}
          onChange={handleChange}
        />
        <label htmlFor="opzione3">Opzione 3</label><br />

        <input
          type="checkbox"
          id="opzione4"
          name="opzione4"
          value="opzione4"
          checked={checkedItems.opzione4 || false}
          onChange={handleChange}
        />
        <label htmlFor="opzione4">Opzione 4</label><br />
      </form>
    </div>
  );
}

export default CheckBoxLayers;
