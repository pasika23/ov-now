import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="app-label">
        <p>ÖV-Now</p>
          <nav>
            <ul>
              <li>
                <Link to="/">Karte</Link>
              </li>
              <li>
                <Link to="/InfoPage">Info Page</Link>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  );
}

export default Header;