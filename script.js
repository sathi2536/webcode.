const pokemonContainer = document.getElementById('pokemon-container');
const nextPageButton = document.getElementById('next-page');
let currentPage = 1;

async function getPokemonData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${(currentPage - 1) * 50}`);
    const data = await response.json();
    const pokemonList = data.results;
    for (const pokemon of pokemonList) {
      const pokemonData = await fetch(pokemon.url);
      const pokemonDetails = await pokemonData.json();
      const pokemonElement = document.createElement('div');
      const pokemonName = document.createElement('h2');
      pokemonName.textContent = pokemonDetails.name;
      const abilitiesHeader = document.createElement('h3');
      abilitiesHeader.textContent = 'Abilities:';
      const abilitiesList = document.createElement('ul');
      for (const ability of pokemonDetails.abilities) {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability.ability.name;
        abilitiesList.appendChild(abilityItem);
      }
      const movesHeader = document.createElement('h3');
      movesHeader.textContent = 'Moves:';
      const movesList = document.createElement('ul');
      for (const move of pokemonDetails.moves) {
        const moveItem = document.createElement('li');
        moveItem.textContent = move.move.name;
        movesList.appendChild(moveItem);
      }
      const weightElement = document.createElement('p');
      weightElement.textContent = `Weight: ${pokemonDetails.weight}`;
      pokemonElement.appendChild(pokemonName);
      pokemonElement.appendChild(abilitiesHeader);
      pokemonElement.appendChild(abilitiesList);
      pokemonElement.appendChild(movesHeader);
      pokemonElement.appendChild(movesList);
      pokemonElement.appendChild(weightElement);
      pokemonContainer.appendChild(pokemonElement);
    }
  } catch (error) {
    console.log(error);
  }
}

nextPageButton.addEventListener('click', () => {
  currentPage++;
  pokemonContainer.innerHTML = '';
  getPokemonData();
});

getPokemonData();