<template>
  <div class="pokecard">
    <div class="pokecard__title">{{pokemonObj.name}}</div>
    <div class="pokecard__image-container">
      <img v-bind:src="pokemonObj.sprites.front_default" alt="Pokeking">
    </div>
    <nuxt-link v-bind:to="`/pokedex/${pokemonObj.name}`" class="button--green">More Info
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Pokecard",
  props: {
    pokemonObj: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.pokemonObj);
  },
};
</script>

<style lang="scss">
.pokecard {
  box-shadow: 7px 10px 12px -5px rgba(0, 0, 0, 0.55);
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  padding-bottom: 3.5rem;
  &__title {
    font-size: 2rem;
    text-transform: uppercase;
    margin-top: 2rem;
    letter-spacing: 5px;
  }
  &__image-container {
    background-color: #eceff1;
    height: 25rem;
    margin: 2rem;
    & img {
      width: 80%;
      height: 80%;
    }
  }
}
</style>