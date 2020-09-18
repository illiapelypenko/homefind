import { GET_PROPERTIES, SET_CARD_SIZE, SET_FAVS } from './actions';

const initialState = {
  properties: [],
  error: {
    type: '',
    message: '',
  },
  cardSize: 'standart',
  favs: [],
};

function reducer(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case GET_PROPERTIES:
      if (error.message)
        return { ...state, error: { type, message: error.message } };
      return { ...state, properties: payload };
    case SET_CARD_SIZE:
      return { ...state, cardSize: action.payload };
    case SET_FAVS:
      return { ...state, favs: action.payload };
    default:
      return state;
  }
}

export default reducer;
