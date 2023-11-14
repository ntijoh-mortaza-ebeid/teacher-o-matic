<script setup lang="ts">
import { ref, Ref } from "vue";
import { IManifest } from "../interfaces/IManifest";
import useAssigemntStore from "../stores/AssignmentStore";
import router from "../router";
import { getManifest } from "../util";

const assignmentStore = useAssigemntStore();

const props = defineProps<{
  owner: string;
  name: string;
  link: string;
  fetchContentsURL: string;
  forksCount: number;
  fetchForksURL: string;
}>();

let repoHasForks: boolean = props.forksCount > 0;
const showSubmissionsButtonEnabled: Ref<boolean> = ref(repoHasForks);
let showSubmissionsButtonText: string = repoHasForks
  ? "show submissions"
  : "no forks for repo found";

router.beforeEach(() => {
  repoHasForks = props.forksCount > 0;
  showSubmissionsButtonEnabled.value = repoHasForks;
  showSubmissionsButtonText = repoHasForks
    ? "show submissions"
    : "no forks for repo found";
});

async function showSubmissions(): Promise<void> {
  getManifest(props.fetchContentsURL).then(
    (getManifestReturn: { ok: boolean; manifest: IManifest | null }) => {
      if (!getManifestReturn.ok || getManifestReturn.manifest === null) {
        showSubmissionsButtonEnabled.value = false;
        showSubmissionsButtonText = "no .manifest.json";
      } else {
        const manifest: IManifest = getManifestReturn.manifest;
        assignmentStore.setManifest(manifest);
        assignmentStore.setFetchForksURL(props.fetchForksURL);
        router.push(`/repos/${props.owner}/${props.name}/submissions`);
      }
    }
  );
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
          @click="showSubmissions"
          v-if="showSubmissionsButtonEnabled"
          class="blue-text text-lighten-2"
        >
          {{ showSubmissionsButtonText }}
        </button>
        <span v-if="!showSubmissionsButtonEnabled" class="blue-text text-lighten-2">
          {{ showSubmissionsButtonText }}
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
