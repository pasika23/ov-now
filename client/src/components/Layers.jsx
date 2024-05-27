import React, { useState } from 'react';
import './Layers.css';
import Zuglinien from '../Image/Zuglinien.png';
import Buslinien from '../Image/Buslinien.png';
import Tramlinien from '../Image/Tramlinien.png';
import Schiffelinien from '../Image/Schiffelinien.png';

function DropdownCheckbox({ label, checked, onChange, imageSrc }) {
  return (
    <div className="dropdown-checkbox">
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      {imageSrc && <img src={imageSrc} alt={label} className="dropdown-checkbox-image" />}
      <label htmlFor={label}>{label}</label><br />
    </div>
  );
}

function DropdownChecklist({ onLayerVisibilityChange }) {
  const [checkedItems, setCheckedItems] = useState({
    rail: false,
    bus: false,
    tram: false,
    ship: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems(prevState => ({ ...prevState, [name]: checked }));
    onLayerVisibilityChange(name, checked);
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      window.touchStartX = touch.clientX;
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const touchEndX = touch.clientX;
      const deltaX = touchEndX - window.touchStartX;

      if (deltaX > 100) {
        setMenuOpen(true);
      }
    }
  };

  return (
    <div
      className={`dropdown-checklist-container ${menuOpen ? 'open' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="dropdown-toggle" onClick={handleToggle}></div>
      <div className="dropdown-content">
        <DropdownCheckbox
          label="rail"
          checked={checkedItems.rail}
          onChange={handleChange}
          imageSrc={Zuglinien}
        />
        <DropdownCheckbox
          label="bus"
          checked={checkedItems.bus}
          onChange={handleChange}
          imageSrc={Buslinien}
        />
        <DropdownCheckbox
          label="tram"
          checked={checkedItems.tram}
          onChange={handleChange}
          imageSrc={Tramlinien}
        />
        <DropdownCheckbox
          label="ship"
          checked={checkedItems.ship}
          onChange={handleChange}
          imageSrc={Schiffelinien}
        />
      </div>
    </div>
  );
}

export default DropdownChecklist;
