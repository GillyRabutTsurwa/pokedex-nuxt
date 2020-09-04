<template>
  <div class="pokecard-container">
    <Pokecard v-for="(currentPokemon, index) in pokemonList" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
import Pokecard from "~/components/Pokecard";

export default {
  name: "Pokedex",
  components: {
    Pokecard: Pokecard,
  },
  data() {
    return {
      pokemonList: [],
    };
  },
  methods: {
    async promiseFunc(iterator) {
      try {
        const response = await this.$axios.$get(
          `https://pokeapi.co/api/v2/pokemon/${iterator}`
        );
        // console.log(response);
        return response;
        // console.log(response.name);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    for (let i = 1; i <= 150; i++) {
      //NOTE: I see, I needed to consume the promise in the function call as well. See await keyword in line below.
      this.pokemonList.push(await this.promiseFunc(i));
    }
    console.log(this.pokemonList);
  },
};
</script>

<style lang="scss">
.pokecard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 27.5rem));
  gap: 2rem;
  justify-content: center;

  margin: 0 1.5rem;
}
</style>  