import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faMagnifyingGlass, 
  faBell, 
  faUser, 
  faChevronDown,
  faUserGear,
  faRightFromBracket 
} from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" aria-label="Menu" onClick={onMenuClick}>
          <FontAwesomeIcon icon={faBars} className="icon" style={{ fontSize: '20px' }} />
        </button>
        
        <div className="search-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" placeholder="Search anything..." className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <div className="notification-container">
          <FontAwesomeIcon icon={faBell} className="bell-icon" style={{ fontSize: '20px' }} />
          <span className="notification-badge">12</span>
        </div>

        <div className="profile-wrapper">
          <div 
            className="profile-container" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="avatar">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px', marginTop: '6px' }} />
            </div>
            <div className="profile-info">
              <span className="profile-name">Admin User</span>
              <span className="profile-role">Administrator</span>
            </div>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} 
              style={{ fontSize: '12px' }} 
            />
          </div>

          {isDropdownOpen && (
            <div className="profile-dropdown">
              <button className="dropdown-item">
                <FontAwesomeIcon icon={faUserGear} className="dropdown-icon" />
                <span>My Profile</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout">
                <FontAwesomeIcon icon={faRightFromBracket} className="dropdown-icon" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
