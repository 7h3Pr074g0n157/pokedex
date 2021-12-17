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

function processTypeProps(pokemon, parent) {
  let pTypes = document.createElement('p');

  let pokeTypes = pokemon.types.map((type) => {
    return type.type.name;
  });
  pokeTypes.forEach((type) => {
    let span = document.createElement('span');
    span.textContent = type;
    pTypes.append(span);
  });

  let backgroundColor;
  if (pokeTypes.includes('grass')) {
    backgroundColor = 'green';
  } else if (pokeTypes.includes('fire')) {
    backgroundColor = 'red';
  } else if (pokeTypes.includes('water')) {
    backgroundColor = 'blue';
  } else if (pokeTypes.includes('electric')) {
    backgroundColor = 'yellow';
  } else if (pokeTypes.includes('poison')) {
    backgroundColor = 'slateblue';
  } else if (pokeTypes.includes('rock')) {
    backgroundColor = 'grey';
  } else if (pokeTypes.includes('normal')) {
    backgroundColor = 'burlywood';
  } else if (pokeTypes.includes('ground')) {
    backgroundColor = 'brown';
  } else if (pokeTypes.includes('ice')) {
    backgroundColor = 'skyblue';
  } else {
    backgroundColor = 'rgb(219, 33, 33);';
  }

  parent.style.backgroundColor = backgroundColor;
  parent.append(pTypes);
  return parent;
}

function renderPokeCards(pokemon) {
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

  div.append(h2);
  div.append(img);
  div = processTypeProps(pokemon, div);

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
  header = processTypeProps(pokemon, header);
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
