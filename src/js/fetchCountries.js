export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response =>
      // console.log(response);
      // if (response.ok) {
      response.json(),
    )
    .then(
      data =>
        // console.log(data);
        data,
    );
  // .catch(error => {
  //   return error;
  // });
}
