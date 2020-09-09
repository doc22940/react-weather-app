import React from "react";
import Header from "../Header/Header";
import CardsList from "../CardsList/CardsList";
import Footer from "../Footer/Footer";
import DetailsPopup from "../DetailsPopup/DetailsPopup";
import Popup from "../Popup/Popup";
import PlaceForm from "../PlaceForm/PlaceForm";
import { Route } from "react-router-dom";
import { geoApi } from "../../services/GeoYandexApi";
import withErrorBoundry from "../hocs/withErrorBoundry";
import "./app.css";
import Loader from "../Loader/Loader";


const places = ["Москва", "Калифорния", "Веллингтон"];

const App = () => {
  const [cards, setCards] = React.useState([]);
  const [openedPopup, setOpenedPopup] = React.useState({});
  const [searchError, setSearchError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  const desableLoading = () => setTimeout(() => {
    setIsLoading(false);
  }, 1000)
  
  const getWeatherData = place => {
    setIsLoading(true);
    return geoApi.getCoords(place).then(card => {
      setCards(cards => {
        const newCards = JSON.parse(JSON.stringify(cards));
        return [...newCards, card];
      });
      desableLoading();
    });
  };

  React.useEffect(() => {
    places.forEach(getWeatherData);
  }, []);

  const onAddCardSubmit = ({ name }) => {
    getWeatherData(name)
      .then(closeAllPopups)
      .catch(err => {
        setSearchError(err);
        desableLoading();          
      });
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
    <>
      <Header onAddPlace={handleAddPlaceClick} />       
      <CardsList cards={cards} onBasketClick={deleteCard} />      

      {openedPopup.isAddPlacePopupOpen && (
        <Popup
          title="Новый прогноз"
          name="new-card"
          onClose={closeAllPopups} >
          <PlaceForm onAddCardSubmit={onAddCardSubmit} />
        </Popup>
      )}

      {searchError && (
        <Popup
          title="Упс!"
          name="not-found"
          onClose={() => setSearchError(false)}>
          <p>Адрес не найден.</p>
        </Popup>
      )}

      <Route
        path="/:id"
        render={({ match, history }) => {
          const currentCard = cards.find(({ _id }) => match.params.id === _id);
          return currentCard && 
        <Popup          
          name="details"
          onClose={() => history.push('/')}>
          <DetailsPopup card={currentCard} />
        </Popup>
          ;
        }}
      />
      <Loader isLoading={isLoading}/>
      <Footer />
    </>
  );
};

export default withErrorBoundry(App);

