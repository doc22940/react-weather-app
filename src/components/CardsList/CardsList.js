import React from 'react';
import Card from '../Card/Card';

import { Route } from 'react-router-dom';



const CardsList = ({ cards, onBasketClick }) => { 

  const cardsElems = cards.map((card)=>{       
    return <Card
    key={card._id}     
    card={card}
    onBasketClick={()=>onBasketClick(card)}         
    />
  });  
  
    return (
     <>
      <main className="content">    
    <section className="places page__section">
      <ul className="places__list page__section">        
        <Route path='/' render={()=>{
          return cardsElems
        }} />             
      </ul>
    </section>
  </main>  
  </>
    );  
}

export default CardsList;