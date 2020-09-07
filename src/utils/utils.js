export const renderLoading = (isLoading = false) => {
  const currentActiveButton = document.querySelector('.popup_is-opened .popup__button');
  if (isLoading) {
    currentActiveButton.textContent = 'Загрузка...';
    return;
  }

  currentActiveButton.textContent = 'Сохранить';
};

export const capitalize = (str) => {
  return str.slice(0,1).toUpperCase()+str.slice(1,)
}

export const timeConverter = (timestamp, offSet) => {
  const date = new Date((timestamp - 10800 + offSet) * 1000);
  let options = {
    weekday: 'short',    
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('ru-Ru', options);
};
export const timeConverterFull = (timestamp, offSet) => {
  const date = new Date((timestamp - 10800 + offSet) * 1000);
  let options = {
    weekday: 'short',    
    month: 'long',
    day: 'numeric'    
  };
  return date.toLocaleString('ru-Ru', options);
};

export const mapPngToIcon = (png) => {
  const styles = {
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-sunny-overcast',
    '03d': 'wi-day-cloudy',
    '04d': 'wi-cloudy',
    '09d': 'wi-day-rain',
    '10d': 'wi-day-sleet',
    '11d': 'wi-day-thunderstorm',
    '13d': 'wi-day-snow',
    '50d': 'wi-day-fog',
    '01n': 'wi-night-clear',
    '02n': 'wi-night-alt-partly-cloudy',
    '03n': 'wi-night-alt-cloudy',
    '04n': 'wi-night-alt-cloudy',
    '09n': 'wi-night-alt-rain',
    '10n': 'wi-night-alt-sleet',
    '11n': 'wi-night-alt-thunderstorm',
    '13n': 'wi-night-alt-snow',
    '50n': 'wi-night-fog',
  };
  return styles[png];
};

export const windDirection = (deg) => {
  if (deg<90){return 'СВ'};
  if (deg<180){return 'ЮВ'};
  if (deg<270){return 'ЮЗ'};
  if (deg<360){return 'СЗ'};
}

// export const getConditions = (condition) => {
//   const conditions = {
//   'clear': 'Ясно',
// 'partly-cloudy': 'Малооблачно',
// 'cloudy': 'Облачно с прояснениями',
// 'overcast': 'Пасмурно',
// 'drizzle': 'Морось',
// 'light-rain': 'Небольшой дождь',
// 'rain': 'Дождь',
// 'moderate-rain': 'Умеренно сильный дождь',
// 'heavy-rain': 'Сильный дождь',
// 'continuous-heavy-rain': 'Длительный сильный дождь',
// 'showers': 'Ливень',
// 'wet-snow': 'Дождь со снегом',
// 'light-snow': 'Небольшой снег',
// 'snow': 'Снег',
// 'snow-showers': 'Снегопад',
// 'hail': 'Град',
// 'thunderstorm': 'Гроза',
// 'thunderstorm-with-rain': 'Дождь с грозой',
// 'thunderstorm-with-hail': 'Гроза с градом',
//   };
//   return conditions[condition];
// }