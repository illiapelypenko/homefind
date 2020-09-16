export async function http(url, urlParams = '', method = 'GET') {
  const API_KEY = '38ab51c595mshb3b30b6eef3338ap1fa61cjsndc842b8881a4';
  const X_RAPID_HOST = 'realtor.p.rapidapi.com';
  const headers = {
    'x-rapidapi-host': X_RAPID_HOST,
    'x-rapidapi-key': API_KEY,
  };

  function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  try {
    const timeout = async (time = 10000) => {
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
    console.log(e);
    throw new Error(
      'An error occurred while searching. Please check your network connection and try again.'
    );
  }
}
