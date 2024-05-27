import React from 'react';
import './Layers.css';

function DropdownCheckbox({ label, checked, onChange, imageSrc, displayLabel }) {
  return (
    <div className="dropdown-checkbox">
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      {imageSrc && <img src={imageSrc} alt={displayLabel} className="dropdown-checkbox-image" />}
      <label htmlFor={label}>{displayLabel}</label><br />
    </div>
  );
}

export default DropdownCheckbox;
