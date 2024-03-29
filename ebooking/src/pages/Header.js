import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="header">
      <p className="logo">User Management System</p>
      <div className="header-right">
        <Link to="/">
          <p className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleSetActiveTab('Home')}>Home</p>
        </Link>
        <Link to="/AddEdit">
          <p className={activeTab === 'AddUser' ? 'active' : ''} onClick={() => handleSetActiveTab('AddUser')}>Add User</p>
        </Link>
        <Link to="/About">
          <p className={activeTab === 'About' ? 'active' : ''} onClick={() => handleSetActiveTab('About')}>About</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
