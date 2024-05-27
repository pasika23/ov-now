import React, { useState } from 'react';
import './Layers.css';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import Zuglinien from '../Image/Zuglinien.png';
import Buslinien from '../Image/Buslinien.png';
import Tramlinien from '../Image/Tramlinien.png';
import Schiffelinien from '../Image/Schiffelinien.png';

function DropdownCheckbox({ label, checked, onChange, Icon, imageSrc }) {
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
      {Icon && <Icon className="dropdown-checkbox-icon" />}
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
    setCheckedItems({ ...checkedItems, [name]: checked });
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
          checked={checkedItems.rail}
          onChange={handleChange}
          imageSrc={Zuglinien}
        />
        <DropdownCheckbox
          label="buBuslinien"
          checked={checkedItems.bus}
          onChange={handleChange}
          imageSrc={Buslinien}
        />
        <DropdownCheckbox
          label="Tramlinien"
          checked={checkedItems.tram}
          onChange={handleChange}
          imageSrc={Tramlinien}
        />
        <DropdownCheckbox
          label="Schiffelinien"
          checked={checkedItems.ship}
          onChange={handleChange}
          imageSrc={Schiffelinien}
        />
        {/*<DropdownCheckbox
          label="Zug"
          checked={checkedItems.rail}
          onChange={handleChange}
          Icon={DirectionsRailwayIcon}
        />
        <DropdownCheckbox
          label="Bus"
          checked={checkedItems.bus}
          onChange={handleChange}
          Icon={DirectionsBusIcon}
        />
        <DropdownCheckbox
          label="Tram"
          checked={checkedItems.tram}
          onChange={handleChange}
          Icon={TramIcon}
        />
        <DropdownCheckbox
          label="Schiffe"
          checked={checkedItems.ship}
          onChange={handleChange}
          Icon={DirectionsBoatIcon}
  />*/}
      </div>
    </div>
  );
}

export default DropdownChecklist;
