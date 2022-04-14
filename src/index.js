import './css/styles.css';
import {fetchCountries} from "./fetchCountries"
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listCountryEl = document.querySelector('.country-list');
const infoCountryEl = document.querySelector('.country-info');

let nameInput = "";

inputEl.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(event) {
    event.preventDefault();

    nameInput = document.getElementById('search-box').value;
  fetchCountries(nameInput).then(onFetchOk).catch(onFetchError) 
}

function onFetchOk(countries) {
  if ((countries.length > 1) && (countries.length <= 10)) {
    listCountryEl.insertAdjacentHTML('beforeend', markupList)
  } 
  else if (countries.length === 1) {
    infoCountryEl.insertAdjacentHTML('beforeend', markupInfo);
  }
  else {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  
}
  
function markupList(countries) {
  countries.map(country => {
        return `<li class="country-list__item">
      <img class="item__image"
      src="${country.flags.svg}"
      alt="flag"/>
      <p class="item__text">${country.name.official}</p>
      </li>`;
      }).join('');}
  
function markupInfo(countries) {
  countries.map(country => {
      return `<div class="country-info__item">
      <img class="item__image"
      src="${country.flags.svg}"
      alt="flag"/>
      <p class="item__text">${country.name.official}</p>
      <p class="item__text">${country.capital}</p>
      <p class="item__text">${country.population}</p>
      <p class="item__text">${country.languages}</p>
      </div>`;
    })
    .join('');
}
    
function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}