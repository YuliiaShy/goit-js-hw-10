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

  nameInput = inputEl.value.trim();
  if (nameInput === '') {
    listCountryEl.innerHTML = '';
    infoCountryEl.innerHTML = '';
  }
  fetchCountries(nameInput).then(onFetchOk).catch(onFetchError) 
}

function onFetchOk(countries) {
  listCountryEl.innerHTML = '';
  infoCountryEl.innerHTML = '';

  if ((countries.length > 1) && (countries.length <= 10)) {
    listCountryEl.insertAdjacentHTML('beforeend', markupList(countries))
  } 
  else if (countries.length === 1) {
    infoCountryEl.insertAdjacentHTML('beforeend', markupInfo(countries));
  }
  else {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  }
  
function markupList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        `<li class="country-list__item">
      <img class="item__image"
      src="${flags.svg}"
      alt="flag" width="60" height="40"/>
      <p class="item__text">${name.official}</p>
      </li>`,
    )
    .join('');}
  
function markupInfo(countries) {
  return countries
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="country-info__item">
      <img class="item__image"
      src="${flags.svg}"
      alt="flag" width="80" height="60"/>
      <h1 class="head__text">${name.official}</h1>
      </div>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>
      `,
    )
    .join('');}
    
function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}