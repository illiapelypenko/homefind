export async function http(url, urlParams = '', method = 'GET') {
  const API_KEY = '602f460c5fmsh71d7ba1f189d2f0p162159jsnda4f7df0403f';
  const X_RAPID_HOST = 'realtor.p.rapidapi.com';
  const headers = {
    'x-rapidapi-host': X_RAPID_HOST,
    'x-rapidapi-key': API_KEY,
  };

  function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  try {
    const timeout = async (time = 30000) => {
      await wait(time);

      throw Error('Session timeout');
    };

    const query = () =>
      fetch(url + urlParams, {
        headers,
      });

    const response = await Promise.race([query(), timeout()]);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw new Error(
      'An error occurred while searching. Please check your network connection and try again.'
    );
  }
}
