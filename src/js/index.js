import countryTpl from '../templates/country.hbs';
import fetchCountries from './fetchCountries';
const _ = require('lodash');

const refs = {
  input: document.querySelector('#input'),
  output: document.querySelector('.country'),
};

// считывание с инпута
refs.input.addEventListener('input', _.debounce(searchCountry, 500));
// refs.input.addEventListener('input', searchCountry);

function searchCountry(e) {
  const searchQuery = e.target.value;
  console.log(searchQuery);
  fetchCountries(searchQuery).then(data => {
    console.log(data);
    if (data.length > 10) {
      console.log('Too many matches found...');
    } else if (data.length === 1) {
      const countryMarkup = countryTpl(data[0]);
      refs.output.innerHTML = countryMarkup;
    } else {
      const countryMarkup = data.map(country => `<li>${country.name}</li>`).join('');
      refs.output.innerHTML = countryMarkup;
    }
  });
}
// console.log(fetchCountries(searchQuery));
// console.log(data);
//
// if (refs.body.className === Theme.DARK) {
//   refs.body.className = Theme.LIGHT;
//   localStorage.setItem('theme', Theme.LIGHT);
// } else {
//   refs.body.className = Theme.DARK;
//   localStorage.setItem('theme', Theme.DARK);
// }

// создание и рендер разметки
// const menuMarkup = foodCards.map(card => foodCardTpl(card)).join('');
// console.log(galleryMarkup);

// refs.menu.innerHTML = menuMarkup;
// function fetchCountries(searchQuery) {
//   fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       return data;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }