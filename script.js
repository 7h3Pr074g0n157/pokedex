const pokedata = document.getElementById('pokedata');

function loadPokemons() {
  pokedata.innerHTML = '';
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118')
    .then((response) => response.json())
    .then((datas) => {
      console.log(datas);
      fetchSinglePokemons(datas.results);
    });
  }
  
  function fetchSinglePokemons(results) {
    results.forEach((result) => {
      fetch(result.url)
      .then((response) => response.json())
      .then((datas) => {
        // console.log(datas);
        renderPokeCards(datas);
      });
  });
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

function renderPokeCards(pokemon) {
  let pokeTypes = pokemon.types.map((type) => {
    return type.type.name;
  });
  console.log(pokeTypes);

  let div = createElements('div', [
    { class: `poke-card ${pokemon.name}` },
    { 'data-id': pokemon.id },
    { 'data-pokemon': pokemon.name },
  ]);
  let h2 = createElements('h2', [{ class: 'poke-card__name' }], pokemon.name);
  let img = createElements('img', [
    { class: 'poke-card__img' },
    { src: pokemon.sprites.front_default },
  ]);
  // let pBaseExp = createElements(
  //   'p',
  //   [],
  //   'Base Exp: ' + pokemon.base_experience
  // );
  let pTypes = document.createElement('p');

  pokeTypes.forEach((type) => {
    let span = document.createElement('span');
    span.textContent = type;
    pTypes.append(span);
  });

  div.append(h2);
  div.append(img);
  div.append(pTypes);
  // div.append(pBaseExp);
  div.addEventListener('click', () => handleShowClickedPokemon(pokemon));
  pokedata.append(div);
}

function createPokeDataHead(pokemon) {
  let header = createElements('header', [{ class: 'pokemon-header' }]);

  let h2 = createElements(
    'h2',
    [{ class: 'pokemon-header__name' }],
    pokemon.name
  );
  let img = createElements('img', [
    { class: 'pokemon-header__img' },
    { src: pokemon.sprites.front_default },
  ]);

  header.append(h2);
  header.append(img);

  return header;
}
function createPokeDataBody(pokemon) {
  let section = createElements('section', [{ class: 'pokemon-body' }]);
  console.log(section);
  let pBaseExp = createElements(
    'p',
    [{ class: 'pokemon-body__base-exp' }],
    'Base Exp: ' + pokemon.base_experience
  );
  let pTypes = createElements(
    'p',
    [{ class: 'pokemon-body__types' }],
    'Type: '
  );
  let ul = createElements('ul', [{ class: 'pokemon-body__moves' }]);
  let h3Attacks = document.createElement('h3');

  pokemon.types.forEach((type) => {
    let span = document.createElement('span');
    span.textContent = type.type.name;
    pTypes.append(span);
  });

  h3Attacks.textContent = 'Attacks:';
  pokemon.moves.forEach((move) => {
    let li = document.createElement('li');
    li.textContent = move.move.name;
    ul.append(li);
  });

  section.append(pTypes);
  section.append(pBaseExp);
  section.append(h3Attacks);
  section.append(ul);

  return section;
}

function handleShowClickedPokemon(pokemon) {
  pokedata.innerHTML = '';
  console.log(pokemon);

  let div = createElements('div', [
    { class: `pokemon ${pokemon.name}` },
    { 'data-id': pokemon.id },
    { 'data-pokemon': pokemon.name },
  ]);

  let pokeDataHead = createPokeDataHead(pokemon);
  let pokeDataBody = createPokeDataBody(pokemon);

  div.append(pokeDataHead);
  div.append(pokeDataBody);
  pokedata.append(div);
}

document.addEventListener('DOMContentLoaded', loadPokemons);
document.getElementById('home-button').addEventListener('click', loadPokemons);
