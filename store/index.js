import pokemonImages from "./modules/pokeimages";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      pokeImages: pokemonImages
    }
  });
};

export default createStore;
