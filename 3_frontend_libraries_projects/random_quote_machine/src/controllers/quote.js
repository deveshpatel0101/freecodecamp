export const getQuote = () => {
  return fetch('https://api.quotable.io/random')
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText + ', Status Code: ', res.status);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      alert('Error while fetching a random quote', err);
    });
};
getQuote();
