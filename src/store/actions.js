import { http } from '../utils/request';

export const GET_PROPERTIES = 'GET_PROPERTIES';

export function getProperties(city, state_code) {
  return async dispatch => {
    let properties;
    let error = {
      type: 'propertiesSearch',
    };

    try {
      const BASE_URL = 'https://realtor.p.rapidapi.com';
      const PROPERTIES_FOR_SALE_URL = BASE_URL + '/properties/v2/list-for-sale';
      const PROPERTIES_FOR_RENT_URL = BASE_URL + '/properties/v2/list-for-rent';
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
      ].filter(prop => {
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

      if (properties.length === 0) {
        error.message =
          'There were no suggestions found for the given location.';
      }
    } catch (err) {
      error.message = err.message;
    }

    dispatch({
      action: GET_PROPERTIES,
      payload: properties,
      error,
    });
  };
}
