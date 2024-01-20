const pokemonName = document.querySelector(`.pokemonName`);
const pokemonNumber = document.querySelector(`.pokemonNumber`);
const pokemonImg = document.querySelector(`.pokemonImg`);

const form = document.querySelector(`.form`);
const input = document.querySelector(`.inputSearch`);
const buttonPrev = document.querySelector(`.btn-prev`);
const buttonNext = document.querySelector(`.btn-next`);

let searchPokemon = 1;

const ferchPokemon = async (pokemon) => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if(APIresponse.status === 200){ // validação pelo o status
    const data = await APIresponse.json();
    return data;
  }

  
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data =  await ferchPokemon(pokemon);

  if(data){
  pokemonImg.style.display = 'block';
  pokemonName.innerHTML = data.name; //nome do pokemon
  pokemonNumber.innerHTML = data.id; // numero do pokemon
  pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; //imagem animada

  input.value = ""; // limpa o valor do input
  searchPokemon = data.id
  
  } else{
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    
  }

  
}

form.addEventListener(`submit`, (event) =>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  
});

buttonPrev.addEventListener(`click`, () =>{
  if(searchPokemon > 1){
    searchPokemon -= 1
  renderPokemon(searchPokemon)
  }
  
});

buttonNext.addEventListener(`click`, () =>{
  searchPokemon += 1
  renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)