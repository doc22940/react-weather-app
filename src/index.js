import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { geoApi } from './services/GeoYandexApi';
import { GeoApiContext } from './components/GeoApiContext/GeoApiContext';

ReactDOM.render(
  <Provider store={store}>
    <GeoApiContext.Provider value={geoApi}>
      <Router>
        <App />
      </Router>
    </GeoApiContext.Provider>
  </Provider>,
  document.getElementById('root')
);
