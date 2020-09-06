import openWeatherApi from './OpenWeatherApi';

class GeoYandexApi {
  constructor(APIkey) {
    this._APIkey = APIkey;
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
        return openWeatherApi.getWeather({ lon, lat }).then(({ current, daily }) => {
          current = { ...current, ...current.weather[0] };
          delete current.weather;
          daily.forEach((el, i) => {
            daily[i] = { ...daily[i], ...daily[i].weather[0] };
            delete daily[i].weather;
          });
          return { name, description, current, daily };
        });
      })

      .catch((err) => console.log(`Загрузка карточек: ${err}`));
  }
}

export const geoApi = new GeoYandexApi('957a067b-e592-4d17-8392-b70e6f96eb76');
