export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      // console.log(response);
      // if (response.ok) {
      return response.json();
      // }
      // else {
      //   const errorText = 'No matches found. Please enter a correct query!';
      //   return errorText;
      // }
    })
    .then(data => {
      // console.log(data);
      return data;
    });
  // .catch(error => {
  //   return error;
  // });
}
