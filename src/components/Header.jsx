import React from 'react';
import logo from '../assets/logo-bucket.png';

function Header() {
  return (
    <header>
      <div className="container">
        <img
          id="logo"
          src={logo}
          alt="My bucket movie list logo"
          title="My bucket movie list"
        />
        <h1 className="text-shadow">My bucket movie list</h1>
      </div>
    </header>
  );
}

export default Header;
