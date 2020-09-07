import React from 'react';
import Header from '../Header/Header';
import CardsList from '../CardsList/CardsList';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import api from '../../services/OpenWeatherApi';
import './app.css';
import { geoApi } from '../../services/GeoYandexApi';

geoApi.getCoords('London').then(res=>console.log(res)
   );

const arr = ['Москва', 'London', 'Sydney'];

const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  
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
    .finally(closeAllPopups);
    
  };

  
  const handleAddPlaceClick = () => {
    setOpenedPopup({ isAddPlacePopupOpen: true });
  };
  const handleBasketIconClick = card => {
    setSelectedCard(card);
    setOpenedPopup({ isDeleteCardPopupOpened: true });
  };
  const closeAllPopups = () => {
    setOpenedPopup({});
    setSelectedCard(false);
  };  

  return (
   
    <Router>
      <Header onAddPlace={handleAddPlaceClick}/>
    {cards.length && <CardsList
        cards={cards}
        handleBasketIconClick={handleBasketIconClick}
        onDeleteCardSubmit={''}
        onClose={closeAllPopups}
        onAddCardSubmit={onAddCardSubmit}
        openedPopup={openedPopup}
      />}
      <Footer />     

      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm
          title="Новое место"
          name="new-card"
          onClose={closeAllPopups}
        >
          <PlaceForm onAddCardSubmit={onAddCardSubmit} />
        </PopupWithForm>
      )}
    
      <Route
        path="/cards/:id"
        render={({ match, history }) => {
          const id = match.params.id;
          const currentCard = cards.find(({ _id }) => id === _id);
          return (
            currentCard && <ImagePopup 
            card={currentCard} 
            onClose={()=>history.push('/cards/')}  
            />
            
          );
        }}
      />
     
    </Router>
   

  );
};

export default App;