import React, { useCallback, useEffect, useRef } from 'react';
import { timeConverter, mapPngToIcon, capitalize, windDirection, timeConverterFull } from '../../utils/utils';


const DetailsPopup = ({card, onClose})=> {
  console.log(card)
  const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', onClose, true)
  }, [onClose])
  
  useEffect(() => {
    const escFunction = ({keyCode}) => {
      if(keyCode === 27) {
        smoothClose();
      }
    }
    const hadleOverlayClick = ({target})=>{
      if(target.classList.contains('popup')){
        smoothClose();
      }
    }
    popup.current.classList.add('popup_is-opened')
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
      
    };
  }, [smoothClose]);
    
    return (
      <>
        <div ref={popup} className='popup popup_type_details'>
          <div className='popup__content popup__content_details'>
            
            <button 
            type='button' 
            className='popup__close'
            onClick={smoothClose}
            ></button>
            
            <div className="card details-popup__card">
      <span className="card__adress-main details-popup__adress-main">{card.name}</span>
      <span className="card__adress-second details-popup__adress-second">{card.description}</span>
      <span className="card__adress-second details-popup__adress-second">{timeConverterFull(card.current.dt, card.timezone_offset)}</span>
      <div
        className="card__icon current__icon"       
      >
        <i className={`wi ${mapPngToIcon(card.current.icon)} card__icon-i details-popup__icon-i`}></i>
      <span className="card__temp-fact details-popup__temp-fact">
        {card.current.temp > 0 ? "+" : "-"}
        {card.current.temp}
      </span>
      </div>
      <span className="card__main-condition details-popup__main-condition">
        {capitalize(card.current.description)}
      </span>
      <span className="card__condition details-popup__condition">
        {`Ощущается как: ${card.current.feels_like > 0 ? "+" : "-"}${card.current.feels_like}`}
      </span>
      <span className="card__condition details-popup__condition">
        {`Ветер: ${windDirection(card.current.wind_deg)}, ${card.current.wind_speed} м/сек`}
      </span>
      <span className="card__condition details-popup__condition">
        {`Влажность: ${card.current.humidity}%`}
      </span>
      <span className="card__condition details-popup__condition">
        {`Давление: ${card.current.pressure} мм рт.ст.`}
      </span>
      
      

    
            </div>
          </div>
        </div>
      </>
    );
  
}

export default DetailsPopup;
