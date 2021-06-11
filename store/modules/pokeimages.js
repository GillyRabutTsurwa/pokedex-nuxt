import axios from "axios";

const promiseFunc = async (iterator) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${iterator}`
    );
    const data = response.data;
    const imageURL = data.sprites.other["official-artwork"].front_default;
    // console.log(imageURL); NOTE: works well now
    return imageURL;
  } catch (error) {
    console.log(error);
  }
};

// ==============================================================================================================================================

const state = () => {
  return {
    pokemonImagesArr: []
  };
};

const getters = {
  getPokemonImages(state) {
    return state.pokemonImagesArr;
  }
};

const mutations = {
  setPokemonImages(state, imagesPayload) {
    state.pokemonImagesArr = imagesPayload;
  }
};

const actions = {
  async fetchPokemonImages(context) {
    const tempPokemonArr = [];
    const pokemonListLimit = 150;
    for (let i = 1; i < pokemonListLimit; i++) {
      tempPokemonArr.push(await promiseFunc(i));
    }
    // console.log(tempPokemonArr); // NOTE: works just fine
    context.commit("setPokemonImages", tempPokemonArr);
  }
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
