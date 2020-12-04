<template>
  <div class="pokemon__stats">
    <div>{{$route.params.id}}</div>
    <h2>Ability</h2>
    <div v-for="currentAbility in abilities" v-bind:key="currentAbility">
      {{currentAbility}}
    </div>
    <h2>Moves</h2>
    <div v-for="currentMove in moves" v-bind:key="currentMove">
      {{currentMove}}
    </div>
    <h2>Types</h2>
    <div v-for="currentType in types" v-bind:key="currentType">
      {{currentType}}
    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
  data() {
    return {
      abilities: [],
      moves: [],
      types: [],
      //TESTING
      stats: [],
    };
  },
  async created() {
    const pokemonName = this.$route.params.id;
    console.log(this.$route.params.id);
    const response = await this.$axios.get(`https://pokeapi.co/api/v2/
pokemon/${pokemonName}`);
    const data = response.data;
    console.log(data);

    const pokemonAbilities = data.abilities;
    console.log(pokemonAbilities);
    // pokemonAbilities.forEach((currentAbilityObj) => {
    //   console.log(currentAbilityObj.ability);
    // });
    this.abilities = pokemonAbilities.map(
      (currentAbilityObj) => currentAbilityObj.ability.name
    );

    console.log(this.abilities);

    //moves
    const pokemonMoves = data.moves;
    console.log(pokemonMoves);
    this.moves = pokemonMoves
      .slice(0, 20)
      .map((currentMoveObj) => currentMoveObj.move.name);

    // type
    const pokemonTypes = data.types;
    this.types = pokemonTypes.map((currentTypeObj) => currentTypeObj.type.name);

    // stats. I will use this somehow with chart.js
    const pokemonStats = data.stats;
    this.stats = pokemonStats.map((currentStatsObj) => [
      currentStatsObj.stat.name,
      currentStatsObj.base_stat,
    ]);
    console.log(this.stats);

    const statTypes = this.stats.map((currentStatsArr) => {
      return currentStatsArr[0];
    });

    const statFigures = this.stats.map((currentStatsArr) => {
      return currentStatsArr[1];
    });

    console.log(statTypes);
    console.log(statFigures);
  },
};
</script>

<style>
.pokemon__stats {
  color: aliceblue;
}
</style>