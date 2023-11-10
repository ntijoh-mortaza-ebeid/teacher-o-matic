<script setup lang="ts">
import router from "../router";
import { useRoute } from "vue-router";
import { ref, Ref } from "vue";

const route = useRoute();
let searchedUser: string = route.params.user as string;
loadRepos(searchedUser);

router.beforeEach((to) => {
  searchedUser = to.params.user as string;
  loadRepos(searchedUser);
});

const repos: Ref<Object[]> = ref([]);
const userFound: Ref<boolean> = ref(true);
const hasRepos: Ref<boolean> = ref(true);

async function loadRepos(user: string): Promise<number | undefined> {
  // fetch repos for user
  const userReposResult: Response = await fetch(
    `https://api.github.com/users/${user}/repos`
  );
  if (!userReposResult.ok) {
    userFound.value = false;
    return 1;
  }

  const userRepos = await userReposResult.json();
  if (userRepos.length === 0) {
    hasRepos.value = false;
    return 1;
  }

  const userReposFiltered = userRepos.map(
    (repo: {
      contents_url: string;
      name: string;
      html_url: string;
      forks_count: number;
      forks_url: string;
    }) => {
      return {
        contents_url: repo["contents_url"].replace("{+path}", ""),
        name: repo["name"],
        url: repo["html_url"],
        forks_count: repo["forks_count"],
        forks_url: repo["forks_url"],
      };
    }
  );

  userFound.value = true;
  hasRepos.value = true;
  repos.value = userReposFiltered;
}
</script>

<template>
  <h2>userFound: {{ userFound }} and hasRepos: {{ hasRepos }}</h2>
  <h2 v-if="!userFound">User Not Found.</h2>
  <h2 v-if="!hasRepos && userFound">No Repos</h2>
  <h2 v-if="userFound && hasRepos">found repos</h2>
</template>

<style scoped></style>
