import React, { useState } from 'react';
import Landeskarte_farbe from '../Image/Landeskarte_farbe.png';
import Landeskarte_grau from '../Image/Landeskarte_grau.png';
import Bild_Luftbild from '../Image/Bild_Luftbild.png';
import Bild_osm from '../Image/Bild_osm.png';
import './backgroundButton.css'

function BackgroundButton({ setBackgroundMap, toggleMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBackgroundChange = (event) => {
    const selectedValue = event.target.value;
    setBackgroundMap(selectedValue);
    toggleMenu(); // Chiama toggleMenu per chiudere il menu dopo aver selezionato uno sfondo
  };

  const toggle = () => {
    setMenuOpen(!menuOpen); // Cambia lo stato di menuOpen quando il pulsante viene cliccato
  };

  const backgroundImageSrc = (mapType) => {
    switch (mapType) {
      case 'Landeskarte-farbe':
        return Landeskarte_farbe;
      case 'Landeskarte-grau':
        return Landeskarte_grau;
      case 'Luftbild':
        return Bild_Luftbild;
      case 'osm':
        return Bild_osm;
      default:
        return Landeskarte_farbe;
    }
  };

  return (
    <div className="background-container" onClick={toggle}>
      <img src={backgroundImageSrc()} width="50" height="50" onClick={toggle} />
      {menuOpen && (
        <div className="background-select">
          {/*<label htmlFor="background-map">Background Map:</label>*/}
          <div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Landeskarte-farbe' } })}>
              {/*<p>Landeskarte farben</p>*/}
              <img src={Landeskarte_farbe} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Landeskarte-grau' } })}>
              {/*<p>Landeskarte grau</p>*/}
              <img src={Landeskarte_grau} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'Luftbild' } })}>
              {/*<p>Luftbild</p>*/}
              <img src={Bild_Luftbild} width="50" height="50" />
            </div>
            <div onClick={() => handleBackgroundChange({ target: { value: 'osm' } })}>
              {/*<p>OpenStreetMap</p>*/}
              <img src={Bild_osm} width="50" height="50" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackgroundButton;
