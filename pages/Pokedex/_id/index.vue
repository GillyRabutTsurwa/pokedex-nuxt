<template>
  <div>
    <span>{{$route.params.id}}</span>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
  async created() {
    const pokemonName = this.$route.params.id;
    console.log(this.$route.params.id);
    const response = await this.$axios.get(`https://pokeapi.co/api/v2/
pokemon/${pokemonName}`);
    console.log(response);
    const data = response.data;
    console.log(data);
    const abilities = data.abilities;
    // console.table(abilities);
    abilities.forEach((currentAbilityObj) => {
      console.log(currentAbilityObj.ability);
    });

    //moves
    const moves = data.moves;
    console.log(moves);
  },
};
</script>

<style>
</style>