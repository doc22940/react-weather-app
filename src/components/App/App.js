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

const places = ['Москва', 'Кейптайун', 'Антарктида' ];

const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({});
  const [searchError, setSearchError] = React.useState(false);
  
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
    places.forEach(searchAndSetCard)       
  }, []);
  
  const onAddCardSubmit = ({ name }) => {
    searchAndSetCard(name)    
    .then(closeAllPopups)
    .catch((err) => {
      setSearchError(err)
      console.log('Локация не найдена')});
  };
  
  const handleAddPlaceClick = () => {
    setOpenedPopup({ isAddPlacePopupOpen: true });
  };

  const deleteCard = card => {    
   const ind = cards.findIndex(el => el._id === card._id);
   setCards([...cards.slice(0, ind), ...cards.slice(ind + 1)]);
  };
  const closeAllPopups = () => {
    setOpenedPopup({});    
  };  

  return (
   
    <Router>
      <Header onAddPlace={handleAddPlaceClick}/>

    {cards.length && <CardsList
        cards={cards}
        onBasketClick={deleteCard} 
      />}       
        {searchError && <PopupWithForm
        title="Адрес не найден"
        name="not-found"
        onClose={()=>setSearchError(false)}
        >

        </PopupWithForm>}
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
          return (currentCard && <DetailsPopup 
            card={currentCard}               
          />) 
        }}
      />
      <Footer />
    </Router>
   

  );
};

export default App;