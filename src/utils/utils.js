export const renderLoading = (isLoading = false) => {
  const currentActiveButton = document.querySelector('.popup_is-opened .popup__button');
  if (isLoading) {
    currentActiveButton.textContent = 'Загрузка...';
    return;
  }

  currentActiveButton.textContent = 'Сохранить';
};

export const getConditions = (condition) => {
  const conditions = {
  'clear': 'Ясно',
'partly-cloudy': 'Малооблачно',
'cloudy': 'Облачно с прояснениями',
'overcast': 'Пасмурно',
'drizzle': 'Морось',
'light-rain': 'Небольшой дождь',
'rain': 'Дождь',
'moderate-rain': 'Умеренно сильный дождь',
'heavy-rain': 'Сильный дождь',
'continuous-heavy-rain': 'Длительный сильный дождь',
'showers': 'Ливень',
'wet-snow': 'Дождь со снегом',
'light-snow': 'Небольшой снег',
'snow': 'Снег',
'snow-showers': 'Снегопад',
'hail': 'Град',
'thunderstorm': 'Гроза',
'thunderstorm-with-rain': 'Дождь с грозой',
'thunderstorm-with-hail': 'Гроза с градом',
  };
  return conditions[condition];
}