export const addWeather = (payload) => ({
  type: 'FETCH_WEATHER_SUCCESS',
  payload
})
export const errorWeather = (payload) => ({
  type: 'FETCH_WEATHER_FAILED',
  payload
})
export const deleteCard = (payload) => ({
  type: 'DELETE_CARD',
  payload
})
export const disableLoading = () => ({
  type: 'DISABLE_LOADING',  
})
export const enableLoading = () => ({
  type: 'ENABLE_LOADING',  
})
export const openAddPlacePopup = () => ({
  type: 'OPEN_ADD_PLACE_POPUP'  
})
export const closePopup = () => ({
  type: 'CLOSE_POPUP'  
})

