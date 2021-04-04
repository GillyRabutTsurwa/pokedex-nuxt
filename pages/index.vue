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
      pokemonImages: [],
      randomArrIndex: 0,
      // timer: null,
    };
  },
  methods: {
    // generateRandomImage() {
    //   let randomIndex = Math.floor(
    //     Math.random() * this.pokemonImages.length + 1
    //   );
    //   return this.pokemonImages[randomIndex];
    // },
    async promiseFunc(iterator) {
      try {
        const data = await this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/${iterator}`);
        const imageURL = data.sprites.other["official-artwork"].front_default;
        return imageURL;
      } catch (error) {
        console.log(error);
      }
    },
    generateRandomIndex() {
      this.randomArrIndex = Math.floor(Math.random() * this.pokemonImages.length + 1);
    },
    renderImages() {
      setInterval(this.generateRandomIndex, 3000);
    },
  },
  computed: {
    currentImg() {
      return this.pokemonImages[this.randomArrIndex];
    },
    // TESTING: vuex data
    pokeImgs() {
      console.log(this.$store);
      return this.$store.getters["getPokemonImages"];
    },
  },
  async created() {
    this.loading = true;
    const pokemonListLimit = 150;
    for (let i = 1; i < pokemonListLimit; i++) {
      this.pokemonImages.push(await this.promiseFunc(i));
    }
    console.dir(this.pokemonImages);
    this.loading = false;

    this.renderImages();
    console.log(this.pokeImgs);
  },
  // updated() {
  //   console.log(`Value of image index: ${this.randomArrIndex}`);
  //   console.log(`Value of currentImg: ${this.currentImg}`);
  // },
};
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