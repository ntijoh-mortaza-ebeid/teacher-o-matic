<script setup lang="ts">
import { ref, Ref } from "vue";

const props = defineProps<{
  name: string;
  link: string;
  fetchContentsURL: string;
  forksCount: number;
  fetchForksURL: string;
}>();

const repoHasForks: boolean = props.forksCount > 0;
const showForksButtonEnabled: Ref<boolean> = ref(repoHasForks);
let showForksButtonText: string = repoHasForks
  ? "show forks"
  : "no forks found";

async function showForks() {
  const routeToManifest: string = `${props.fetchContentsURL}.manifest.json`;
  const manifestReponse: Response = await fetch(routeToManifest);
  if (!manifestReponse.ok) {
    showForksButtonEnabled.value = false;
    showForksButtonText = "no .manifest.json";
    return 1;
  }

  const manifestBase64: string = (await manifestReponse.json()).content;
  const manifest = JSON.parse(atob(manifestBase64)); // TODO ADD TYPE SAFETY

  console.log(manifest);
  console.log(props.fetchForksURL);
}
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
        <h3>{{ name }}</h3>
      </div>
      <div class="card-action">
        <a v-bind:href="link" class="blue-text text-lighten-2">
          Show On Github
        </a>
        <p>|</p>
        <button
          @click="showForks"
          v-if="showForksButtonEnabled"
          class="blue-text text-lighten-2"
        >
          {{ showForksButtonText }}
        </button>
        <span v-if="!showForksButtonEnabled" class="blue-text text-lighten-2">
          {{ showForksButtonText }}
        </span>
        <p id="forks-count">{{ forksCount }}</p>
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
span {
  text-transform: uppercase;
  cursor: not-allowed;
}
</style>
../index.ts
