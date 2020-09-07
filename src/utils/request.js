export async function http(url, urlParams = '', method = 'GET') {
  const API_KEY = '111f4ef646msh0edca9349d6475cp1b2e0cjsn85aad4b1d986';
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
    console.log(e);
    throw new Error(e);
  }
}