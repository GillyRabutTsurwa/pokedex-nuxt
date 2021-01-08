<template>
  <div>
    <!-- Show navigation except in the single pokemon info page route -->
    <!-- <Navigation v-if="routeName !== 'Pokedex-id'" /> -->
    <Nuxt class="main" />
  </div>
</template>

<script>
// import Navigation from "../components/Navigation";
export default {
  data() {
    return {
      routeName: this.$route.name,
    };
  },
  components: {
    // Navigation: Navigation,
  },
  mounted() {
    console.log(this.routeName);
  },
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  min-height: 100%;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: rgb(42, 50, 63);
}

.main {
  /* height: calc(100% - 7.5rem); //NOT WORKING: */
  height: 90vh;
}

button,
a {
  font-size: 1.6rem;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem;
}
</style>
