import React from 'react';
import logo from '../../images/logo.ico';

const Header = ({onAddPlace}) => {
  return (
    <header className="header page__section">
      <img src={logo} className='logo'/>
    <h1 className="header__logo">Weather App</h1>
    <button 
      className="profile__add-button" 
      type="button"
      onClick={onAddPlace}
      >+</button>
  </header>
  )
};

export default Header;

