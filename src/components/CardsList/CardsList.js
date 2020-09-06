import React, {useContext} from 'react';
import Card from '../Card/Card';

import { Route, NavLink } from 'react-router-dom';



const CardsList = ({cards}) => {
  
  
  

  const cardsElems = cards.map((card)=>{  
    
    return <Card     
    card={card}         
    />
  });  
  
    return (
     <>
      <main className="content">    
    <section className="places page__section">
      <ul className="places__list">        
        <Route path='/' render={()=>{
          return (
            cardsElems
          )
        }} />             
      </ul>
    </section>
  </main>  
  </>
    );  
}

export default CardsList;