<template>
  <nav class="navigation">
    <nuxt-link to="/">
      <Logo class="navigation__logo" />
    </nuxt-link>
    <ul class="navigation__list">
      <li class="navigation__list--item">
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li class="navigation__list--item">
        <nuxt-link to="/pokedex">Pokemon</nuxt-link>
      </li>
      <li class="navigation__list--item">
        <nuxt-link to="/">More</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Pokeball from "./shared/Pokeball";
export default {
  components: {
    Pokeball: Pokeball,
  },
};
</script>

<style>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 7.5rem;
  /* background-color: #42b883; */
}

.navigation__logo {
  width: 20rem;
  height: 20rem;
}

.navigation__list {
  display: flex;
  list-style-type: none;
}

.navigation__list--item {
  margin: 0 1rem;
}

.navigation__list--item a:link,
.navigation__list--item a:visited {
  text-decoration: none;
  color: #e2f7fa;
  text-transform: uppercase;
  font-size: 1.8rem;
  font-size: bold;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;

  transition: border-bottom 0.3s ease-in;
}

.navigation__list--item a:hover,
.navigation__list--item a:active {
  border-bottom: 2px solid #e2f7fa;
}
</style>