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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
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
        const data = await this.$axios.$get(
          `https://pokeapi.co/api/v2/pokemon/${iterator}`
        );
        const imageURL = data.sprites.other["official-artwork"].front_default;
        return imageURL;
      } catch (error) {
        console.log(error);
      }
    },
    generateRandomIndex() {
      this.randomArrIndex = Math.floor(
        Math.random() * this.pokemonImages.length + 1
      );
    },
    renderImages() {
      setInterval(this.generateRandomIndex, 3000);
    },
  },
  computed: {
    currentImg() {
      return this.pokemonImages[this.randomArrIndex];
    },
  },
  async created() {
    this.loading = true;
    for (let i = 1; i < 150; i++) {
      this.pokemonImages.push(await this.promiseFunc(i));
    }
    console.dir(this.pokemonImages);
    this.loading = false;

    this.renderImages();
  },
  //TESTING;
  updated() {
    console.log(`Value of timer: ${this.timer}`);
    console.log(`Value of image index: ${this.randomArrIndex}`);
    console.log(`Value of currentImg: ${this.currentImg}`);
  },
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
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}

/* TESTING: */
span {
  color: white;
}
</style>