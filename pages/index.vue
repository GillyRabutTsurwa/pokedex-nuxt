<template>
  <div class="home-page">
    <h4 v-if="loading">Loading</h4>
    <div v-else class="container">
      <div>
        <div class="home-page-image">
          <img v-bind:src="currentImg" alt="">
        </div>
        <div class="links">
          <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
            Documentation
          </a>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey">
            GitHub
          </a>
          <NuxtLink to="/pokedex" target="_blank" class="button--pokedex">
            Pokedex
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      loading: null,
      /**
       * NOTE: pokemonImages should be empty, as we are not using it anymore
       * instead, we are using the array from the vuex store as a getter
       * QUESTION: do you know what a getter is?
       * in our case, our getter simply returns the state, as is
       * so techinically, we could access the state instead of the getter, and the outcome would be the same
       *
       * just to clarify, every occurence of pokeImgs(vuex state retrieved as a getter) used to be ones of pokemonImages(original state of this component/page)
       */
      pokemonImages: [],
      randomArrIndex: 0,
      timer: 3000, // NOTE: in milliseconds. i finally found a way to use this variable
    };
  },
  methods: {
    obtenirPokemonImages() {
      /**
       * NOTE:
       * this code is responsible for fetching Pokemon from the API. i moved it from here to the store
       * this is a very shallow explanation, but the code in store/index.js will make more sense upon being read and analysed
       */
      this.$store.dispatch("fetchPokemonImages");
    },
    generateRandomIndex() {
      this.randomArrIndex = Math.floor(
        Math.random() * this.pokeImgs.length + 1
      );
    },
    renderImages() {
      setInterval(this.generateRandomIndex, this.timer);
    },
  },
  computed: {
    pokeImgs() {
      return this.$store.getters.getPokemonImages;
    },
    currentImg() {
      // return this.pokemonImages[this.randomArrIndex];
      return this.pokeImgs[this.randomArrIndex];
    },
  },
  async created() {
    this.loading = true;
    this.obtenirPokemonImages();
    this.loading = false;

    this.renderImages();
  },
};
// NOTE: finally, i got everything to work, a goo job dun
</script>

<style>
.home-page {
  width: 100%;
  height: calc(100vh - 7.5rem);
}
.container {
  margin: 0 auto;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home-page-image {
  width: 50rem;
  height: 50rem;
}

.home-page-image img {
  width: 100%;
  height: 100%;
}
</style>