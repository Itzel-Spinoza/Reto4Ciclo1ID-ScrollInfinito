const pokemonContainer = document.getElementById('contenedor-pokemon');
let offset = 0;
const limit = 20;
let loading = false;

const fetchPokemon = async () => {
    loading = true;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    data.results.forEach(async pokemon => {
        const pokemonData = await fetch(pokemon.url);
        const pokemonDetails = await pokemonData.json();
        displayPokemon(pokemonDetails);
    });
    offset += limit;
    loading = false;
};

const displayPokemon = (pokemon) => {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <span class="pokemon-name">${pokemon.name}</span>
    `;
    pokemonContainer.appendChild(pokemonElement);
};

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        fetchPokemon();
    }
};

window.addEventListener('scroll', handleScroll);

fetchPokemon();
