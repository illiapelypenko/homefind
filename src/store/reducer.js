import {
  GET_PROPERTIES,
  CLEAR_PROPERTIES,
  SET_CARD_SIZE,
  CLEAR_ERROR,
  ADD_FAV,
  REMOVE_FAV,
} from "./actions";

import { loadState } from "../utils/localStorage";

const initialState = {
  properties: [],
  error: "",
  cardSize: "standart",
  favs: [],
};

function reducer(state = { ...initialState, ...loadState() }, action) {
  const { type, payload, error } = action;

  switch (type) {
    case GET_PROPERTIES:
      if (error) return { ...state, error };
      return { ...state, properties: payload };
    case CLEAR_PROPERTIES:
      return { ...state, properties: [] };
    case SET_CARD_SIZE:
      return { ...state, cardSize: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    case ADD_FAV:
      return { ...state, favs: [...state.favs, action.payload] };
    case REMOVE_FAV:
      const fav = action.payload;
      const favs = state.favs.filter(
        (item) => item.property_id !== fav.property_id
      );
      return { ...state, favs };
    default:
      return state;
  }
}

export default reducer;
