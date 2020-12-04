<template>
  <div class="pokecard-container">
<<<<<<< HEAD
    <!-- NEW: The pokeball spins while we're fetching Pokemon from the API -->
    <Pokeball v-if="loading" class="lg spinnin" />
    <Pokecard v-else v-for="(currentPokemon, index) in pokemonList" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
=======
    <Pokecard v-for="(currentPokemon, index) in pokemonList" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
>>>>>>> 4-single-pokemon-route
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
import Pokeball from "~/components/shared/Pokeball";
import Pokecard from "~/components/Pokecard";

export default {
  name: "Pokedex",
  components: {
    Pokeball: Pokeball,
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
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
<<<<<<< HEAD
    // NEW: loading is true as we're fetching the pokemon
    this.loading = true;
=======
>>>>>>> 4-single-pokemon-route
    for (let i = 1; i <= 150; i++) {
      this.pokemonList.push(await this.promiseFunc(i));
    }
    console.log(this.pokemonList);
<<<<<<< HEAD
    //NOTE: after we've fethe all the pokemon, then we set loading to false, which will make the loader stop and the pokecards will render
    this.loading = false;
=======
>>>>>>> 4-single-pokemon-route
  },
};
</script>

<style lang="scss">
.pokecard-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 27.5rem));
  // So I don't know what I like better: 27.5rem for the largest possible unit of 1fr. Je vais decider plus tard
  gap: 2rem;
  justify-content: center;

  margin: 0 1.5rem;
}

.lg {
  width: 50rem;
  height: 50rem;
}

.spinnin {
  animation: spin 1.25s linear infinite; // linear is a value for what property again?
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>  