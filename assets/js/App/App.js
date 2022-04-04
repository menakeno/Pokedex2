const searchButton = document.getElementById("search-btn");
const pokemonResults = document.getElementById("pokemon-result");
const pokemonCount = 50;

const fetchAllPokemon = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  showPokemonData(pokemon);
};

fetchAllPokemon();

function showPokemonData(pokemon) {
  const singlePokemonCard = document.createElement("div");
  singlePokemonCard.classList.add("col-md-3");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonType = pokemon.types[0].type.name;
  const pokemonID = pokemon.id;

  const pokemonInnerHTML = `
      <div class="card mt-4">
            <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="${name}}">
            <div class="card-body">
              <h5><strong>#${pokemonID
                .toString()
                .padStart(3, "0")}</strong></h5>
              <h4 class="card-title"><strong>${name}</strong></h4>
              <br />
              <h5 class="modal-title">
                <span class="badge badge-${pokemonType}">${pokemonType}</span>
              </h5>
              <br />
              <p class="text-capitalize"><strong>weight: </strong> ${
                pokemon.weight
              }</p>
              <p class="text-capitalize"><strong>ability: </strong> ${
                pokemon.abilities[0].ability.name
              }</p>
            </div>
          </div>
    `;

  singlePokemonCard.innerHTML = pokemonInnerHTML;
  pokemonResults.appendChild(singlePokemonCard);
}
