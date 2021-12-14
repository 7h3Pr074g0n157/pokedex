const pokedex = document.getElementById('pokedex');
let results = [],
  pokemons = [];

async function loadPokemons() {
  pokedex.innerHTML = '';
  let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon/';
  let response = await fetch(urlAllPokemon);
  let jsonData = await response.json();
  results.push(...jsonData.results);
  console.log('Results', results.length, results);
  fetchSinglePokemons();
}

function fetchSinglePokemons() {
  results.forEach(async (result) => {
    let response = await fetch(result.url);
    let jsonData = await response.json();
    pokemons.push(jsonData);
  });
  console.log('Pokemons', pokemons.length, pokemons);
  pokemons.forEach((pokemon) => console.log(pokemon));
  renderPokeCards();
}

function createElements(tagName, attributes, text = undefined) {
  let block = document.createElement(tagName);
  if (attributes) {
    for (const attribute of attributes) {
      let [key, value] = Object.entries(attribute)[0];
      block.setAttribute(key, value);
    }
  }
  if (text) block.textContent = text;
  return block;
}

function renderPokeCards() {
  pokemons.forEach((pokemon) => {
    let div = createElements('div', [
      { class: `pokemon ${pokemon.name}` },
      { 'data-id': pokemon.id },
    ]);
    let h2 = createElements('h2', [], pokemon.name);
    let img = createElements('img', [
      { class: 'img-size' },
      { src: pokemon.sprites.front_default },
    ]);
    let pBaseExp = createElements(
      'p',
      [],
      'Base Exp: ' + pokemon.base_experience
    );
    let pTypes = document.createElement('p');
    let select = document.createElement('select');

    pokemon.types.forEach((type) => {
      let span = document.createElement('span');
      span.textContent = type.type.name;
      pTypes.append(span);
    });

    pokemon.moves.forEach((move) => {
      let option = document.createElement('option');
      option.textContent = move.move.name;
      option.value = move.move.name;
      select.append(option);
    });
    div.append(h2);
    div.append(img);
    div.append(pTypes);
    div.append(pBaseExp);
    div.append(select);
    pokedex.append(div);
  });
}

function handleShowChoosenPokemon() {}

document.addEventListener('DOMContentLoaded', loadPokemons);
document.getElementById('home-button').addEventListener('click', loadPokemons);
