import React from 'react';

import { useHistory } from 'react-router-dom'
import { getConditions } from '../../utils/utils';


const Card = ({card}) => {  
  // console.log(card)
  return (
  <li className="places__item card">   
    <h4 className='card__title'>Москва</h4>
    <div className='card__icon' style={{backgroundImage: `url('https://yastatic.net/weather/i/icons/blueye/color/svg/${card.fact.icon}.svg')`}}>
    </div>
    <span className='card__temp-fact'>{card.fact.temp>0 ?'+':'-'}{card.fact.temp}</span>
    <span className='card__condition'>{getConditions(card.fact.condition)}</span>
    <span className='card__condition'>{`Ощущается как: ${card.fact.feels_like>0 ?'+':'-'}${card.fact.feels_like}`}</span>
    <span className='card__condition'>{`Ветер: ${card.fact.wind_speed}, ${card.fact.wind_dir}, до ${card.fact.wind_gust}м/сек`}</span>
    <span className='card__condition'>{`Влажность: ${card.fact.humidity}%`}</span>
    <span className='card__condition'>{`Давление: ${card.fact.pressure_mm} мм рт.ст.`}</span>
    

      
        <button type="button" 
        className={`card__like-button `}        
        ></button>   
    
  </li>
  )
};



export default Card;




