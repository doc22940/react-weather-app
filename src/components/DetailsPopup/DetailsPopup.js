import React from 'react';
import {
  dateConverter,
  mapPngToIcon,
  capitalize,
  windDirection,
  shortDateConverter,
  addPlusOrMinus,
} from '../../utils/utils';
import './deteails-popup.css';

const DetailsPopup = ({ card }) => {
  return (
    <>
      <div className='details-popup__card'>
        <span className='card__adress-main details-popup__adress-main'>{card.name}</span>
        <span className='card__adress-second details-popup__adress-second'>{card.description}</span>
        <span className='card__adress-second details-popup__adress-second'>
          {dateConverter(card.current.dt, card.timezone_offset)}
        </span>
        <div className='card__icon details-popup__icon'>
          <i className={`wi ${mapPngToIcon(card.current.icon)} card__icon-i details-popup__icon-i`}></i>
          <span className='card__temp-fact details-popup__temp-fact'>
            {addPlusOrMinus(card.current.temp)}
          </span>
        </div>
        <span className='card__main-condition details-popup__main-condition'>
          {capitalize(card.current.description)}
        </span>
        <span className='card__condition details-popup__condition'>
          {`Ощущается как: ${addPlusOrMinus(card.current.feels_like)}`}
        </span>
        <span className='card__condition details-popup__condition'>
          {`Ветер: ${windDirection(card.current.wind_deg)}, ${card.current.wind_speed} м/сек`}
        </span>
        <span className='card__condition details-popup__condition'>
          {`Влажность: ${card.current.humidity}%`}
        </span>
        <span className='card__condition details-popup__condition'>
          {`Давление: ${card.current.pressure} мм рт.ст.`}
        </span>
      </div>
      <hr className='details__border'></hr>
      <div className='details-popup__forecast'>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[1].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[1].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[1].temp.min)}${addPlusOrMinus(card.daily[1].temp.max)}`}</span>
        </div>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[2].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[2].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[2].temp.min)}${addPlusOrMinus(card.daily[2].temp.max)}`}</span>
        </div>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[3].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[3].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[3].temp.min)}${addPlusOrMinus(card.daily[3].temp.max)}`}</span>
        </div>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[4].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[4].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[4].temp.min)}${addPlusOrMinus(card.daily[4].temp.max)}`}</span>
        </div>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[5].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[5].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[5].temp.min)}${addPlusOrMinus(card.daily[5].temp.max)}`}</span>
        </div>
        <div className='forecast__day'>
          <span className='forecast__day_description'>
            {shortDateConverter(card.daily[6].dt, card.timezone_offset)}
          </span>
          <i className={`wi ${mapPngToIcon(card.daily[6].icon)} forecast__day_icon`}></i>
          <span className='forecast__day_description'>{`
                ${addPlusOrMinus(card.daily[6].temp.min)}${addPlusOrMinus(card.daily[6].temp.max)}`}</span>
        </div>
      </div>
    </>
  );
};

export default DetailsPopup;
