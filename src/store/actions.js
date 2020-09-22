import { http } from "../utils/request";

export const GET_PROPERTIES = "GET_PROPERTIES";
export const CLEAR_PROPERTIES = "CLEAR_PROPERTIES";
export const SET_CARD_SIZE = "SET_CARD_SIZE";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";

export function getProperties(city, state_code) {
  return async (dispatch) => {
    let properties;
    let error;

    try {
      const BASE_URL = "https://realtor.p.rapidapi.com";
      const PROPERTIES_FOR_SALE_URL = BASE_URL + "/properties/v2/list-for-sale";
      const PROPERTIES_FOR_RENT_URL = BASE_URL + "/properties/v2/list-for-rent";
      const urlParams = encodeURI(
        `?sort=relevance&city=${city}&limit=500&offset=0&state_code=${state_code}`
      );

      const [propertiesForSale, propertiesForRent] = await Promise.all([
        http(PROPERTIES_FOR_SALE_URL, urlParams),
        http(PROPERTIES_FOR_RENT_URL, urlParams),
      ]);

      properties = [
        ...propertiesForSale.properties,
        ...propertiesForRent.properties,
      ];

      properties = filter((prop) => {
        const {
          thumbnail,
          photos_count,
          building_size,
          prop_status,
          price,
          baths,
          beds,
          address,
        } = prop;

        return (
          (thumbnail || photos_count) &&
          building_size?.size &&
          prop_status &&
          price &&
          baths &&
          beds &&
          address.city &&
          address.neighborhood_name
        );
      });

      if (!properties.length) {
        error = "We are sorry! We have not found any properties.";
      }
    } catch (err) {
      error = "We are sorry! Server is unavailable";
    }

    dispatch({
      type: GET_PROPERTIES,
      payload: properties,
      error,
    });
  };
}

export function clearProperties() {
  return {
    type: CLEAR_PROPERTIES,
  };
}

export function setCardSize(cardSize = "standart") {
  return {
    type: SET_CARD_SIZE,
    payload: cardSize,
  };
}

export function addFav(fav) {
  return {
    type: ADD_FAV,
    payload: fav,
  };
}

export function removeFav(fav) {
  return {
    type: REMOVE_FAV,
    payload: fav,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}
