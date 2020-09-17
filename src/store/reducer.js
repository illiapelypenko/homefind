import { GET_PROPERTIES } from './actions';

const initialState = {
  properties: [],
  error: {
    type: '',
    message: '',
  },
};

function reducer(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case GET_PROPERTIES:
      if (error) return { ...state, error: error };
      return { ...state, properties: payload };
    default:
      return state;
  }
}

export default reducer;
