// Importuri module
// Select all la tot ce am nevoie
// Adaugare clasa hidden la paragrafe si div
// O functie care populeaza selectul
// Un event listener la selectare
// Un event cu o functie care afiseaza data si face request catre server cand apasa pe ceva
// Acel ceva o sa genereze data pe care trebuie sa le introduc in html

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_LHGZzFAdl2BtnLwbomiBhyI4AhJ4vEuomKW1GU4SKThZJOslkkGvyivoWPM1mULY';

const selectedBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrayBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selectedBreed,
      data: arrayBreedsId,
    });
  })
  .catch(onError);

selectedBreed.addEventListener('change', onSelectedBreed);

function onSelectedBreed(event) {
  event.preventDefault();

  loader.classList.replace('is-hidden', 'loader');
  selectedBreed.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selectedBreed.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="cat-image">
                                 <img src="${url}" alt="${breeds[0].name}" width="400"/>
                            </div>
                            <div class="cat-about">
                                <h1>${breeds[0].name}</h1>
                                <p>${breeds[0].description}</p>
                                <p><b>Temperament:</b> ${breeds[0].temperament}</p>
                            </div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError(error) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
  });
}
