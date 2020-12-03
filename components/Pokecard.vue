<template>
  <div class="pokecard">
    <div class="pokecard__title">{{pokemonObj.name}}</div>
    <div class="pokecard__image-container">
      <img v-bind:src="pokemonObj.sprites.front_default" alt="Pokeking">
    </div>
    <!-- NOTE: I may make custom buttons later on -->
    <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
      More Info
    </a>
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
};
</script>

<style lang="scss">
.pokecard {
  box-shadow: 7px 10px 12px -5px rgba(0, 0, 0, 0.55);
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  padding-bottom: 3.25rem;

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