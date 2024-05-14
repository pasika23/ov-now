import React, { useState } from 'react';
import './Layers.css';

function DropdownCheckbox({ label, checked, onChange }) {
  return (
    <div>
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label><br />
    </div>
  );
}

function DropdownChecklist() {
  const [checkedItems, setCheckedItems] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dropdown-checklist-container">
      <div className="dropdown-toggle" onClick={handleToggle}>
        Layers
      </div>
      {menuOpen && (
        <div className="dropdown-content">
          <DropdownCheckbox
            label="zuglinien"
            checked={checkedItems.zuglinien || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="buslinien"
            checked={checkedItems.buslinien || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="tramlinien"
            checked={checkedItems.tramlinien || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="schiffelinien"
            checked={checkedItems.schiffelinien || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="zug"
            checked={checkedItems.zug || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="bus"
            checked={checkedItems.bus || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="tram"
            checked={checkedItems.tram || false}
            onChange={handleChange}
          />
          <DropdownCheckbox
            label="schiffe"
            checked={checkedItems.schiffe || false}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default DropdownChecklist;
