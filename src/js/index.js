import countryTpl from '../templates/country.hbs';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#input'),
  output: document.querySelector('.country'),
};

// pnotify
// import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/Angeler.css';
// import * as Confirm from '@pnotify/confirm';
// import '@pnotify/confirm/dist/PNotifyConfirm.css';
const { error } = require('@pnotify/core');
const { defaultModules } = require('@pnotify/core');
const PNotifyBootstrap4 = require('@pnotify/bootstrap4');

defaultModules.set(PNotifyBootstrap4, {});
// function alertPnotify() {
//   info({
//     title: 'Sorry!',
//     text: 'Too many matches found. Please enter a more specific query!',
//     modules: new Map([
//       [
//         Confirm,
//         {
//           confirm: true,
//           buttons: [
//             {
//               text: 'Ok',
//               primary: true,
//               click: notice => {
//                 notice.close();
//               },
//             },
//           ],
//         },
//       ],
//     ]),
//   });
// }
// const myError = error({
//   text: 'Too many matches found. Please enter a more specific query!',
// });
// считывание с инпута
refs.input.addEventListener('input', debounce(searchCountry, 500));
// refs.input.addEventListener('input', searchCountry);

function searchCountry(e) {
  const searchQuery = e.target.value;
  console.log(searchQuery);
  fetchCountries(searchQuery).then(data => {
    console.log(data);
    if (data.length > 10) {
      // alertPnotify();
      error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
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
