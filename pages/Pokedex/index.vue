<template>
  <div class="pokecard-container">
    <h4 v-if="loading">Loading Pokemon</h4>
    <Pokecard v-else v-for="(currentPokemon, index) in pokemonList" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
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
      //NEW:
      loading: false,
    };
  },
  methods: {
    async promiseFunc(iterator) {
      try {
        const response = await this.$axios.$get(
          `https://pokeapi.co/api/v2/pokemon/${iterator}`
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.loading = true;
    for (let i = 1; i <= 150; i++) {
      this.pokemonList.push(await this.promiseFunc(i));
    }
    console.log(this.pokemonList);
    this.loading = false;
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