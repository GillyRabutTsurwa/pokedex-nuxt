<template>
  <div class="about-pokemon">
    <h2 class="about-pokemon__title">About {{name}}</h2>

    <div class="about-pokemon__types">
      <h3 class="about-pokemon__types--title">Types</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentType in types" v-bind:key="currentType">
          {{currentType}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__ability">
      <h3 class="about-pokemon__ability--title">Prime Abilities</h3>
      <ul class="about-pokemon__ability--list">
        <li v-for="currentAbility in abilities" v-bind:key="currentAbility">
          {{currentAbility}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__moves">
      <h3 v-if="moves.length >= 20" class="about-pokemon__moves--title">Top {{moves.length}} Moves</h3>
      <h3 v-else>Top Moves</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentMove in moves" v-bind:key="currentMove">
          {{currentMove}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__stats">
      <h3 class="about-pokemon__moves--title">Stats</h3>
      <div class="chart-container">
        <canvas id="pokeChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
export default {
  data() {
    return {
      name: this.$route.params.id,
      abilities: [],
      moves: [],
      types: [],
      //TESTING
      stats: [],
      statTypes: [],
      statFigures: [],
    };
  },
  // NOTETODO: Too much code in this created hook. will need to refactor this and break code up into functions
  async created() {
    const pokemonName = this.$route.params.id;
    console.log(this.$route.params.id);
    const URL = "https://pokeapi.co/api/v2/pokemon";
    const response = await this.$axios.get(`${URL}/${pokemonName}`);
    // console.log(response);
    const data = response.data;
    console.log(data);
    const pokemonAbilities = data.abilities;
    console.log(pokemonAbilities);
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
    this.statTypes = statTypes;
    console.log(statFigures);
    this.statFigures = statFigures;
    const chart = document.getElementById("pokeChart").getContext("2d");
    let myChart = new Chart(chart, {
      type: "doughnut", // i apparently doughnut works fine
      data: {
        labels: this.statTypes,
        datasets: [
          {
            data: this.statFigures,
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
        // cutoutPercentage: 50, hold up i may not need this
      },
    });
  },
  mounted() {
    // const chart = document.getElementById("pokeChart").getContext("2d");
    // console.log(this.statTypes, this.statFigures);
    // let myChart = new Chart(chart, {
    //   type: "doughnut",
    //   data: {
    //     // labels: ["Red", "Blue", "Yellow"],
    //     labels: this.statTypes,
    //     datasets: [
    //       {
    //         // data: [10, 20, 30],
    //         data: this.statFigures,
    //         backgroundColor: [
    //           "rgb(255, 99, 132)",
    //           "rgb(54, 162, 235)",
    //           "rgb(255, 206, 86)",
    //           "rgb(255, 99, 132)",
    //           "rgb(54, 162, 235)",
    //           "rgb(255, 206, 86)",
    //         ],
    //       },
    //     ],
    //   },
    //   options: {
    //     // Main difference between doughnut and pie: cutOutPercentage
    //     // cutoutPercentage: 50,
    //   },
    // });
  },
};
</script>

<style lang="scss">
.about-pokemon {
  color: aliceblue;
  margin: 0 5rem;
  font-size: 1.4rem;
  //TESTING:
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // this will select all elements inside the .about-pokemon element, the main parent element that have the class title included in the class name
  & [class*="title"] {
    text-transform: uppercase;
  }
  ul {
    list-style: none;
  }
  &__title {
    font-size: 3.5rem;
    text-align: center;
    text-transform: uppercase;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.25rem;
    grid-column: 1 / -1;
  }
  &__ability {
    &--list {
      // list-style: none;
    }
  }
  &__stats {
    .chart-container {
      width: 100%;
      #pokeChart {
        // width: 100%;
        // height: 100%;
      }
    }
  }
}
</style>