<template>
  <div class="pokecard-container">
    <Pokecard v-for="(currentPokemon, index) in pokemonList" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
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
      const URL = "https://pokeapi.co/api/v2/pokemon";
      try {
        const response = await this.$axios.get(`${URL}/${iterator}`);
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    for (let i = 1; i <= 150; i++) {
      this.pokemonList.push(await this.promiseFunc(i));
    }
    console.log(this.pokemonList);
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
  animation: spin 1.25s linear infinite; // linear is a value for what property again? mmmm.
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