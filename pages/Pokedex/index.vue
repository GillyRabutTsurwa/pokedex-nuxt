<template>
  <div v-bind:class="{'container-on-load': loading, 'container-after-load': !loading}" class="pokecard-container">
    <Pokeball v-if="loading" class="lg spinnin" />
    <Pokecard v-for="(currentPokemon, index) in pokeData" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
  </div>
</template>

<script>
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
      //NEW:
      loading: null,
    };
  },
  computed: {
    pokeData() {
      return this.$store.getters.getPokemonData;
    },
  },
  methods: {
    obtenirPokemonData() {
      this.$store.dispatch("fetchPokemonData");
    },
  },
  mounted() {
    // NEW: loading is true as we're fetching the pokemon
    this.loading = true;
    this.obtenirPokemonData();
    console.log(this.pokeData);
    this.loading = false;
  },
};
</script>

<style lang="scss">
.pokecard-container {
  margin: 0 1.5rem;
  width: 100%;
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

// dynamic classes
.container-on-load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.container-after-load {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 27.5rem));
  gap: 2rem;
  justify-content: center;
  min-height: 100vh;
}
</style>