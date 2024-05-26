import React, { useState } from 'react';
import './Layers.css';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

function DropdownCheckbox({ label, checked, onChange, Icon }) {
  return (
    <div className="dropdown-checkbox">
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      {Icon && <Icon className="dropdown-checkbox-icon" />}
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

      if (deltaX > 100) { // Adatta la soglia per determinare quanto scorrere per aprire il menu
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
          label="Zuglinien"
          checked={checkedItems.zuglinien || false}
          onChange={handleChange}
        />
        <DropdownCheckbox
          label="Buslinien"
          checked={checkedItems.buslinien || false}
          onChange={handleChange}
        />
        <DropdownCheckbox
          label="Tramlinien"
          checked={checkedItems.tramlinien || false}
          onChange={handleChange}
        />
        <DropdownCheckbox
          label="Schiffelinien"
          checked={checkedItems.schiffelinien || false}
          onChange={handleChange}
        />
        <DropdownCheckbox
          label="Zug"
          checked={checkedItems.zug || false}
          onChange={handleChange}
          Icon={DirectionsRailwayIcon}
        />
        <DropdownCheckbox
          label="Bus"
          checked={checkedItems.bus || false}
          onChange={handleChange}
          Icon={DirectionsBusIcon}
        />
        <DropdownCheckbox
          label="Tram"
          checked={checkedItems.tram || false}
          onChange={handleChange}
          Icon={TramIcon}
        />
        <DropdownCheckbox
          label="Schiffe"
          checked={checkedItems.schiffe || false}
          onChange={handleChange}
          Icon={DirectionsBoatIcon}
        />
      </div>
    </div>
  );
}

export default DropdownChecklist;