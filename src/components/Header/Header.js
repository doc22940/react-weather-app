import React from 'react';


const Header = ({onAddPlace}) => {
  return (
    <header className="header page__section">
      {/* <i className="wi wi-day-sunny logo"></i>     */}
    <h1 className="header__logo">°Синоптик</h1>
    <button 
      className="profile__add-button" 
      type="button"
      onClick={onAddPlace}
      >+</button>
  </header>
  )
};

export default Header;

