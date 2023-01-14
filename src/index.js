import "./css/styles.css";
const _ = require("lodash");
import Notiflix from "notiflix";
import fetchCountry from "./fetchCountries";

const search = document.querySelector(".search-box");
const list = document.querySelector(".country-list");
const DEBOUNCE_DELAY = 300;

//borrar list
const remove = () => {
  list.innerHTML = "";
};

//escuchar lo que escribe el usuario
search.addEventListener(
  "input",
  _.debounce((e) => {
    if (e.target.value === "") {
      remove();
    }

    let input = e.target.value;
    input = input.trim();

    let url = `https://restcountries.com/v2/name/${input}`;

    fetchCountry(url)
      .then((countries) => {
        renderPosts(countries);
      })
      .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      });
  }, DEBOUNCE_DELAY)
);

function renderPosts(countries) {
  if (countries.length == 1) {
    remove();
    console.log(countries);
    countrytarget(countries);
  }

  if (countries.length > 2 && countries.length < 10) {
    remove();
    const markup = countries
      .map((country) => {
        return `
      <li><img class="flag" alt="" src="${country.flags.svg}">${country.name}</li>
  `;
      })
      .join("");
    list.innerHTML = markup;
  }

  if (countries.length > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Please enter a more specific name.`
    );
  }
}

function countrytarget(countries) {
  const country = countries[0];
  let Arraylanguajes = languajes(country.languages);
  list.innerHTML = `<div class="country__target" ><h1><img  alt="${country.name}" src="${country.flags.svg}">  ${country.name}</h1>
  <ul>
  <li>Capital: ${country.capital} </li>
  <li>Population: ${country.population} </li>
  <li>Languajes: ${Arraylanguajes}</li>
  </ul>
  
  </div>`;
}

function languajes(Arraylanguajes) {
  const languajes = Arraylanguajes.map((e) => e.name);
  return languajes;
}
