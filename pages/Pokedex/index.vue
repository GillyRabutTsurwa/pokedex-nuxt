<template>
  <div>
    <h4>Pokedex will go here</h4>
    <div v-for="(currentPokemon, index) in pokemonList" v-bind:key="index">{{currentPokemon.name}}</div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
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

<style>
</style>  