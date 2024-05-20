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
            Icon={DirectionsRailwayIcon}
          />
          <DropdownCheckbox
            label="bus"
            checked={checkedItems.bus || false}
            onChange={handleChange}
            Icon={DirectionsBusIcon}
          />
          <DropdownCheckbox
            label="tram"
            checked={checkedItems.tram || false}
            onChange={handleChange}
            Icon={TramIcon}
          />
          <DropdownCheckbox
            label="schiffe"
            checked={checkedItems.schiffe || false}
            onChange={handleChange}
            Icon={DirectionsBoatIcon}
          />
        </div>
      )}
    </div>
  );
}

export default DropdownChecklist;
