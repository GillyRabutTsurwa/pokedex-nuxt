const promiseFunc = async iterator => {
  const data = await this.$axios.$get(
    `https://pokeapi.co/api/v2/pokemon/${iterator}`
  );
  const imageURL = data.sprites.other["official-artwork"].front_default;
  console.log(imageURL);
  return imageURL;
};

const state = () => ({
  pokemonImagesArr: []
});

const getters = {
  getPokemonImages(state) {
    return [state.pokemonImagesArr, 2, 2, 4, 5, 6, 7, 8];
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
    context.commit("setPokemonImages", tempPokemonArr);
  }
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
