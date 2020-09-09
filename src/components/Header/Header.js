import React from 'react';
import Button from '@material-ui/core/Button';
import './header/header.css';


const Header = ({onAddPlace}) => {
  return (
    <header className="header page__section">
      {/* <i className="wi wi-day-sunny logo"></i>     */}
    <h1 className="header__logo">°Синоптик</h1>
    <Button variant="contained" onClick={onAddPlace} className="header__add-button">
      +
    </Button>   
  </header>
  )
};

export default Header;

