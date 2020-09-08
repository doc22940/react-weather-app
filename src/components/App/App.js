import React from 'react';
import Header from '../Header/Header';
import CardsList from '../CardsList/CardsList';
import Footer from '../Footer/Footer';
import DetailsPopup from '../DetailsPopup/DetailsPopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import './app.css';
import { geoApi } from '../../services/GeoYandexApi';

const arr = ['Москва', 'Нью-Йорк', 'Париж' ];

const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({});  
  
  const [cards, setCards] = React.useState([]);
  const searchAndSetCard = place => {    
    return geoApi.getCoords(place)
    .then(card=>{
      setCards(cards=>{
        const newCards = JSON.parse(JSON.stringify(cards));
        return [...newCards, card]
      })      
    })
  }  

  React.useEffect(() => {     
   arr.forEach(searchAndSetCard)       
  }, []);
  
  const onAddCardSubmit = ({ name }) => {
    searchAndSetCard(name)    
    .then(closeAllPopups)
    .catch((err) => console.log('Локация не найдена'));
  };
  
  const handleAddPlaceClick = () => {
    setOpenedPopup({ isAddPlacePopupOpen: true });
  };
  const handleBasketIconClick = card => {
    
  };
  const closeAllPopups = () => {
    setOpenedPopup({});
    
  };  

  return (
   
    <Router>
      <Header onAddPlace={handleAddPlaceClick}/>

    {cards.length && <CardsList
        cards={cards}
        handleBasketIconClick={handleBasketIconClick} 
      />}       

      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm
          title="Новый прогноз"
          name="new-card"
          onClose={closeAllPopups}
        >
          <PlaceForm onAddCardSubmit={onAddCardSubmit} />
        </PopupWithForm>
      )}

      <Route path="/:id" render={({ match }) => {
          const currentCard = cards.find(({ _id }) => match.params.id === _id);
          return <DetailsPopup 
            card={currentCard}               
            /> 
        }}
      />
      <Footer />
    </Router>
   

  );
};

export default App;