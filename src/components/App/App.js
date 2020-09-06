import React from 'react';
import Header from '../Header/Header';
import CardsList from '../CardsList/CardsList';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import api from '../services/OpenWeatherApi';
import './app.css';
import { data } from './data';
import { geoApi } from '../services/GeoYandexApi';

geoApi.getCoords('Екатеринбург').then(res=>console.log(res)
   );

const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const [cards, setCards] = React.useState([data]);
 

  React.useEffect(() => {
   
       
  }, []);
  
  const onDeleteCardSubmit = e => {
    e.preventDefault();
    api
      .removeCard(selectedCard._id)
      .then(res => {
        const ind = cards.findIndex(el => el._id === selectedCard._id);
        setCards([...cards.slice(0, ind), ...cards.slice(ind + 1)]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onAddCardSubmit = ({ name, link }) => {
    api.addCard({ name, link }).then(card => {
      setCards([...cards, card]);
      closeAllPopups();
    });
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
    <CardsList
        cards={cards}
        
        
        
        
        handleBasketIconClick={handleBasketIconClick}
        onDeleteCardSubmit={onDeleteCardSubmit}
        onClose={closeAllPopups}
        onAddCardSubmit={onAddCardSubmit}
        openedPopup={openedPopup}
      />
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