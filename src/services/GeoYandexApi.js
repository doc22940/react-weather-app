import openWeatherApi from './OpenWeatherApi';

class GeoYandexApi {
  constructor(APIkey, getWeather) {
    this._APIkey = APIkey;
    this._getWeather = getWeather;
  }

  getCoords(searchString) {
    return fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this._APIkey}&geocode=${searchString}`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then((res) => {
        const {
          name,
          description,
          Point: { pos },
        } = res.response.GeoObjectCollection.featureMember[0].GeoObject;
        const [lon, lat] = pos.split(' ');
        return this._getWeather({ lon, lat })
        .then(({ current, daily, hourly }) => ({ name, description, current, daily, hourly }))
        })      
      .catch((err) => console.log(`Загрузка карточек: ${err}`));
  }
}

export const geoApi = new GeoYandexApi('957a067b-e592-4d17-8392-b70e6f96eb76', openWeatherApi.getWeather);
