import React, {useContext} from "react";
import Header from "../Header/Header";
import CardsList from "../CardsList/CardsList";
import Footer from "../Footer/Footer";
import DetailsPopup from "../DetailsPopup/DetailsPopup";
import Popup from "../Popup/Popup";
import PlaceForm from "../PlaceForm/PlaceForm";
import { Route } from "react-router-dom";
import withErrorBoundry from "../hocs/withErrorBoundry";
import "./app.css";
import Loader from "../Loader/Loader";
import withGeoApi from "../hocs/withGeoApi";
import {addWeather, disableLoading, openAddPlacePopup, closePopup, errorWeather, enableLoading, deleteCard} from '../../actions'
import { connect } from "react-redux";

const places = ["Москва", "Калифорния", "Веллингтон"];

const App = ({cards, isLoading, getWeatherData, openedPopup, openAddPlacePopup, closePopup, errorWeather, error, deleteCard}) => {      

  React.useEffect(() => {
    places.forEach(getWeatherData);
  }, []);

  const onAddCardSubmit = ({ name }) => {    
    getWeatherData(name)
      .then(closePopup)
      .catch(err => {
        errorWeather(err);               
      });
  }; 
  
  return (
    <>
      <Header onAddPlace={openAddPlacePopup} />       
      <CardsList cards={cards} onBasketClick={deleteCard} />      

      {openedPopup.isAddPlacePopupOpen && (
        <Popup
          title="Новый прогноз"
          name="new-card"
          onClose={closePopup} >
          <PlaceForm onAddCardSubmit={onAddCardSubmit} />
        </Popup>
      )}

      {error && (
        <Popup
          title="Упс!"
          name="not-found"
          onClose={() => errorWeather(null)}>
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

const mapStateToProps = ({cards, isLoading, openedPopup, error}) => ({
  cards,
  isLoading,
  openedPopup,
  error
})

const mapDispatchToProps = (dispatch, { geoApi }) => {
  return {
    enableLoading: () => dispatch(enableLoading()),
    getWeatherData: (place) => {
      dispatch(enableLoading());
      return geoApi.getCoords(place).then((card) => {
        dispatch(addWeather(card));
        setTimeout(() => dispatch(disableLoading()), 1000);
      });
    },
    openAddPlacePopup: () => dispatch(openAddPlacePopup()),
    closePopup: () => dispatch(closePopup()),
    errorWeather: (err) => dispatch(errorWeather(err)),
    deleteCard: (card)=> dispatch(deleteCard(card)),
  };
};


export default withErrorBoundry(withGeoApi(connect(mapStateToProps, mapDispatchToProps)(App)));

