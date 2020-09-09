import React from "react";
import { capitalize, timeConverter, mapPngToIcon, addPlusOrMinus } from "../../utils/utils";
import { Link } from "react-router-dom";


const Card = ({ card, onBasketClick }) => {
  return (
    <Link to={`/${card._id}`}>
    <li className="places__item card">
    <button type="button" className="card__delete-button"
    onClick={onBasketClick}
  ></button>
      <span className="card__adress-main">{card.name}</span>
      <span className="card__adress-second">{card.description}</span>
      <span className="card__adress-second">{timeConverter(card.current.dt, card.timezone_offset)}</span>
      <div
        className="card__icon"  
      >
        <i className={`wi ${mapPngToIcon(card.current.icon)} card__icon-i`}></i>
      <span className="card__temp-fact">
        {addPlusOrMinus(card.current.temp)}
      </span>
      </div>
      <span className="card__main-condition">
        {capitalize(card.current.description)}
      </span>
      <span className="card__condition">
        {`Ощущается как: ${addPlusOrMinus(card.current.feels_like)}`}
      </span>    
      

    </li>
    </Link>
  );
};

export default Card;
