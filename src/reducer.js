const initialState = {
  cards: [],
  isLoading: true,
  openedPopup: {},
  error: null
}

export default (state = initialState, { type, payload }) => {  
  switch (type) {

  case 'FETCH_WEATHER_SUCCESS':
    return { ...state,
      isLoading: true, 
      cards: [...state.cards, payload] }
  case 'FETCH_WEATHER_FAILED':
    return { ...state,
      isLoading: false, 
      error: payload }
  case 'DELETE_CARD':
    const index = state.cards.findIndex(({_id}) => _id === payload._id)
    return { ...state,
      cards: [...state.cards.slice(0, index), ...state.cards.slice(index + 1)] 
    }

  case 'ENABLE_LOADING':
    return { ...state,
      isLoading: true
    }
  case 'DISABLE_LOADING':
    return { ...state,
      isLoading: false
    }
  case 'OPEN_ADD_PLACE_POPUP':
    return { ...state,
      openedPopup: { isAddPlacePopupOpen: true }
    }
  case 'CLOSE_POPUP':
    return { ...state,
      openedPopup: {}
    }

  default:
    return state
  }
}