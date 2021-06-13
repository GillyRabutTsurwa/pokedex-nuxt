import axios from "axios";

const promiseFunc = async (iterator) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${iterator}`
    );
    const data = response.data;
    const imageURL = data.sprites.other["official-artwork"].front_default;
    return {
      pokemonData: data,
      imageData: imageURL
    };
  } catch (error) {
    console.log(error);
  }
};

// ==============================================================================================================================================

const state = () => {
  return {
    // NEW:
    pokemonDataArr: [],
    // =================
    pokemonImagesArr: []
  };
};

const getters = {
  // NEW:
  getPokemonData(state) {
    return state.pokemonDataArr;
  },
  // ===========================
  getPokemonImages(state) {
    return state.pokemonImagesArr;
  }
};

const mutations = {
  // NEW:
  setPokemonData(state, dataPayload) {
    state.pokemonDataArr = dataPayload;
  },
  // ==================================
  setPokemonImages(state, imagesPayload) {
    state.pokemonImagesArr = imagesPayload;
  }
};

const actions = {
  // NEW:
  async fetchPokemonData(context) {
    const tempPokemonArr = [];
    const pokemonListLimit = 150;
    for (let i = 1; i < pokemonListLimit; i++) {
      tempPokemonArr.push((await promiseFunc(i)).pokemonData);
    }
    console.log(tempPokemonArr); // NOTE: works just fine
    context.commit("setPokemonData", tempPokemonArr);
  },
  // ==========================================================
  async fetchPokemonImages(context) {
    const tempPokemonArr = [];
    const pokemonListLimit = 150;
    for (let i = 1; i < pokemonListLimit; i++) {
      tempPokemonArr.push((await promiseFunc(i)).imageData);
    }
    console.log(tempPokemonArr); // NOTE: works just fine
    context.commit("setPokemonImages", tempPokemonArr);
  }
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
