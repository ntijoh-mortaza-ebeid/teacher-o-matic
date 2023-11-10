<script setup lang="ts">
import { ref } from "vue";
import router from "../router.ts";

const searchedUser = ref("");
</script>

<template>
  <!-- Import Google Icon Font -->
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />

  <!-- Compiled and minified CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
  />

  <div class="card horizontal">
    <div class="card-stacked">
      <div class="card-content">
        <h3></h3>
      </div>
      <div class="card-action">
        <button id="button--forks" class="blue-text text-lighten-2">
          Show forks
        </button>
        <p>|</p>
        <a href="#" id="link--gh" class="blue-text text-lighten-2">
          Show On Github
        </a>
        <p id="forks-count"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card.horizontal {
  height: 100%;
}
.card-stacked {
  width: 100%;
}
.card-content {
  overflow-wrap: break-word;
}
.card-action {
  max-width: 100%;
  display: flex;
  gap: 10px;
  position: relative;
}
.card-action > a {
  margin: 0 !important;
}
.card-action > p {
  margin: 0;
}
.card-stacked h3 {
  margin: 0;
  font-weight: bold;
}
#forks-count {
  position: absolute;
  right: 20px;
}
button {
  background-color: unset;
  border: 0;
  text-transform: uppercase;
  padding: 0;
  cursor: pointer;
}
button:focus {
  background-color: unset;
}
</style>
../index.ts
