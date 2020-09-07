import React from "react";
import { useHistory } from "react-router-dom";
import { capitalize, timeConverter, mapPngToIcon } from "../../utils/utils";


const Card = ({ card }) => {
  return (
    <li className="places__item card">
      <span className="card__adress-main">{card.name}</span>
      <span className="card__adress-second">{card.description}</span>
      <span className="card__adress-second">{timeConverter(card.current.dt, card.timezone_offset)}</span>
      <div
        className="card__icon"
        
        // style={{
        //   backgroundImage: `url('http://openweathermap.org/img/wn/${card.current.icon}@2x.png')`
        // }}
      >
        <i className={`wi ${mapPngToIcon(card.current.icon)} card__icon-i`}></i>
      <span className="card__temp-fact">
        {card.current.temp > 0 ? "+" : "-"}
        {card.current.temp}
      </span>
      </div>
      <span className="card__main-condition">
        {capitalize(card.current.description)}
      </span>
      <span className="card__condition">
        {`Ощущается как: ${card.current.feels_like > 0 ? "+" : "-"}${card.current.feels_like}`}
      </span>
      {/* <span className="card__condition">
        {`Ветер: ${card.current.wind_speed} м/сек`}
      </span>
      <span className="card__condition">
        {`Влажность: ${card.current.humidity}%`}
      </span>
      <span className="card__condition">
        {`Давление: ${card.current.pressure} мм рт.ст.`}
      </span> */}
      

    </li>
  );
};

export default Card;
