

// const thePokemon = async () => {
//     try {
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
//         const data = await res.json();
//     return data;
//     }   catch (error) {
//         console.log(error);
//     }    
// };

// thePokemon();





    let pokemones = JSON.parse(localStorage.getItem('pokemon')) || [];


    const saveLocalStorage = pokemonList => {
        localStorage.setItem('pokemon', JSON.stringify(pokemonList));
    };

const getPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/` + id.toString();
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon)
}

const createPokemonCard = async (pokemon) => {
    const { id, name, types, height, weight, sprites } = pokemon;
    const type = types[0].type.name;
    const pokemonDiv = document.createElement ("div");
    pokemonDiv.classList.add('card')
    const pokeInnerHtml = `
    <div class="img-container">
        <img src="${sprites.front_default}" alt="${name}" />
        </div>
        <h1 class="name">${name}</h1>
    <div class="info">
        <p class="type">Habitát:${type} </p>
        <p class="height">Altura: ${height / 10}m</p>
        <p class="weight">Peso: ${weight / 10}Kg</p>
        <p class="id">${id}</p>
        </div>
    `
    pokemonDiv.innerHTML = pokeInnerHtml
    cards.appendChild(pokemonDiv)

}


const renderPokeList = pokeList => {
    cards.innerHTML = pokeList.map(pokemon => createPokemonCard(pokemon)).join('');
  };


const searchPokemon = async e => {
    e.preventDefault();
    const searchedPokemon = input.value.trim();
    if (searchedPokemon === ['']) {
        alert ('No hay cokemone, elegi uno');
        return;
    }



    renderPokeList(pokemones);
    saveLocalStorage(pokemones);
   
    form.reset();
  };






const init = () => {
    renderPokeList(pokemones);
    form.addEventListener('submit', searchPokemon);
};
init();