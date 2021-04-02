<template>
  <div class="about-pokemon">
    <div class="about-pokemon__title">
      <h2 class="about-pokemon__title--title">About {{name}}</h2>
      <div class="about-pokemon__title--back">
        <nuxt-link v-bind:to="`/pokedex`" class="btn-back">
          <Pokeball />
        </nuxt-link>
      </div>
    </div>

    <div class="about-pokemon__types">
      <h3 class="about-pokemon__types--title">{{typeSubtitle}}:</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentType in types" v-bind:key="currentType">
          {{currentType}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__ability">
      <h3 class="about-pokemon__ability--title">Prime Abilities:</h3>
      <ul class="about-pokemon__ability--list">
        <li v-for="currentAbility in abilities" v-bind:key="currentAbility">
          {{currentAbility}}
        </li>
      </ul>
    </div>

    <div v-bind:style="{backgroundColor: `rgb(${imgBackGroundClr})`}" class="pokemon-image">
      <img id="img" @load="imgVibez" v-bind:src="imgURL" alt="name" crossorigin="annonymous">
    </div>

    <div class="about-pokemon__stats">
      <h3 class="about-pokemon__stats--title">Stats</h3>
      <div class="chart-container">
        <canvas id="pokeChart" width="400" height="400"></canvas>
      </div>
    </div>

    <div class="about-pokemon__moves">
      <!-- NOTE: replacing this -->
      <!-- <h3 v-if="moves.length >= 20" class="about-pokemon__moves--title">Top {{moves.length}} Moves</h3>
      <h3 v-else>Top Moves</h3> -->
      <!-- with this -->
      <h3 class="about-pokemon__moves--title">{{moveSubtitle}}</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentMove in moves" v-bind:key="currentMove">
          {{currentMove}}
        </li>
      </ul>
    </div>
    <!-- <div class="back">
      <nuxt-link v-bind:to="`/pokedex`" class="btn-back">
        <Pokeball />
      </nuxt-link>
    </div> -->
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
import ColorThief from "colorthief";
import Pokeball from "~/components/shared/Pokeball";
export default {
  components: {
    Pokeball: Pokeball,
  },
  data() {
    return {
      name: this.$route.params.id,
      abilities: [],
      moves: [],
      types: [],
      imgURL: "",
      stats: [],
      statTypes: [],
      statFigures: [],
      imgBackGroundClr: "",
    };
  },
  methods: {
    imgVibez() {
      const colorThief = new ColorThief();
      const img = document.querySelector("#img");
      console.dir(img);
      if (img.complete) {
        // colorThief.getColor(img);
        console.log(colorThief.getPalette(img));
        let primaryColour = colorThief.getPalette(img)[0];
        let primaryColourValue = primaryColour.join(",");
        this.imgBackGroundClr = primaryColourValue;
        console.log(this.imgBackGroundClr);
      } else {
        colorThief.getColor(img);
      }
    },
    async renderPokemonData() {
      const pokemonName = this.$route.params.id;
      console.log(this.$route.params.id);
      const URL = "https://pokeapi.co/api/v2/pokemon";
      const response = await this.$axios.get(`${URL}/${pokemonName}`);
      const data = response.data;
      console.log(data);
      const id = data.id;
      console.log(id);
      const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      this.imgURL = imgURL;
      const pokemonAbilities = data.abilities;
      console.log(pokemonAbilities);
      this.abilities = pokemonAbilities.map(
        (currentAbilityObj) => currentAbilityObj.ability.name
      );
      console.log(this.abilities);
      const pokemonMoves = data.moves;
      console.log(pokemonMoves);
      this.moves = pokemonMoves
        .slice(0, 20)
        .map((currentMoveObj) => currentMoveObj.move.name);
      const pokemonTypes = data.types;
      this.types = pokemonTypes.map(
        (currentTypeObj) => currentTypeObj.type.name
      );
      console.log(this.types);
      const pokemonStats = data.stats;
      this.stats = pokemonStats.map((currentStatsObj) => [
        currentStatsObj.stat.name,
        currentStatsObj.base_stat,
      ]);
      console.log(this.stats);
      //TESTING:
      const statTypes = this.stats.map((currentStatsArr) => {
        return currentStatsArr[0];
      });
      const statFigures = this.stats.map((currentStatsArr) => {
        return currentStatsArr[1];
      });
      console.log(statTypes);
      console.log(statFigures);
      console.log(statTypes);
      this.statTypes = statTypes;
      console.log(statFigures);
      this.statFigures = statFigures;
      this.createChart(statTypes, statFigures);
    },
    createChart(statTypes, statFigures) {
      const chart = document.getElementById("pokeChart").getContext("2d");
      let myChart = new Chart(chart, {
        type: "doughnut",
        data: {
          labels: statTypes,
          datasets: [
            {
              data: statFigures,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(2, 100, 255)",
                "rgb(235, 162, 189)",
                "rgb(55, 206, 186)",
              ],
            },
          ],
        },
        options: {
          legend: {
            labels: {
              fontColor: "#FFF",
            },
          },
        },
      });
    },
  },
  computed: {
    typeSubtitle() {
      return this.types.length > 1 ? "Types" : "Type";
    },
    moveSubtitle() {
      return this.moves.length >= 20
        ? `Top ${this.moves.length} moves`
        : "Top Moves";
    },
  },
  async created() {
    console.time("test");
    await this.renderPokemonData();
    console.timeEnd("test");
    console.log("GILBERT IS A BOSS");
  },
};
</script>

<style lang="scss" scoped>
.pokemon-image {
  width: 45rem;
  height: 45rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.about-pokemon {
  color: aliceblue;
  margin: 0 5rem;
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.5rem;
  place-items: center;
  & [class*="title"] {
    text-transform: uppercase;
  }
  ul {
    list-style: none;
  }
  &__title {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    &--title {
      font-size: 3.5rem;
      text-align: center;
      text-transform: uppercase;
      font-family: Poppins, sans-serif;
      letter-spacing: 0.25rem;
      grid-column: 1 / -1;
    }
    &--back {
      position: fixed;
      top: 2rem;
      right: 2rem;
      transition: transform 0.5s ease;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  &__types,
  &__ability {
    display: flex;
    align-items: center;
    ul {
      margin-left: 1rem;
      li {
        margin-right: 1rem;
        text-transform: uppercase;
        font-size: 1.25rem;
        font-weight: 500;
      }
    }
  }
  &__types {
    grid-column: 1 / 2;
  }
  &__ability {
    grid-column: 2 / -1;
    &--list {
      display: flex;
    }
  }
  &__stats {
    //TESTING: grid rows aren't defined but let's see if it'll work
    // you can tell I have much to learn about css grid
    &--title {
      text-align: center;
    }
    .chart-container {
      width: 45rem;
      height: 45rem;
      margin: 0 auto;
      #pokeChart {
        // width: 45rem;
        // height: 45rem;
        width: 100%;
        height: 100%;
      }
    }
  }
  &__moves {
    grid-column: 1 / -1;
    text-align: center;
    &--list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      li {
        margin-right: 1.5rem;
      }
    }
  }
}
</style>