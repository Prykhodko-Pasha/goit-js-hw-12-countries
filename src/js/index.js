import countryTpl from '../templates/country.hbs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#input'),
  output: document.querySelector('.country'),
};

// pnotify
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.maxTextHeight = null; //Deleting Maximum height of the text container
//===========

refs.input.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  const searchQuery = e.target.value;
  console.log(searchQuery);
  fetchCountries(searchQuery).then(data => {
    console.log(data);
    if (data.length > 10) {
      error({
        title: 'Sorry!',
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
      });
    } else if (data.length === 1) {
      const countryMarkup = countryTpl(data[0]);
      refs.output.innerHTML = countryMarkup;
    } else {
      const countryMarkup = data.map(country => `<li>${country.name}</li>`).join('');
      refs.output.innerHTML = `<ul class="country__list">${countryMarkup}</ul>`;
    }
  });
}
