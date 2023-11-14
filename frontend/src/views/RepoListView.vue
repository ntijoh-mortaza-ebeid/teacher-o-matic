<script setup lang="ts">
import router from "../router";
import { useRoute } from "vue-router";
import { ref, Ref } from "vue";
import RepoCard from "../components/RepoCard.vue";

interface IRepo {
  owner: string;
  name: string;
  link: string;
  fetchContentsURL: string;
  forksCount: number;
  fetchForksURL: string;
}

interface IGithubApiRepoResponse {
  contents_url: string;
  name: string;
  html_url: string;
  forks_count: number;
  forks_url: string;
}

const repos: Ref<IRepo[]> = ref([]);
const userFound: Ref<boolean> = ref(true);
const hasRepos: Ref<boolean> = ref(true);

const route = useRoute();
let searchedUser: string = route.params.user as string;
loadRepos(searchedUser);

router.beforeEach((to) => {
  searchedUser = to.params.user as string;
  loadRepos(searchedUser);
});

async function loadRepos(owner: string): Promise<number> {
  // fetch repos for user
  const userReposResult: Response = await fetch(
    `https://api.github.com/users/${owner}/repos`
  );
  if (!userReposResult.ok) {
    userFound.value = false;
    return 1;
  }

  const userRepos: IGithubApiRepoResponse[] = await userReposResult.json();
  if (userRepos.length === 0) {
    hasRepos.value = false;
    return 1;
  }

  const userReposFiltered: IRepo[] = userRepos.map(
    (repo: IGithubApiRepoResponse) => {
      return {
        owner: owner,
        name: repo["name"],
        link: repo["html_url"],
        fetchContentsURL: repo["contents_url"].replace("{+path}", ""),
        forksCount: repo["forks_count"],
        fetchForksURL: repo["forks_url"],
      };
    }
  );

  userFound.value = true;
  hasRepos.value = true;
  repos.value = userReposFiltered;

  return 0;
}
</script>

<template>
  <h2 v-if="!userFound">User Not Found.</h2>
  <h2 v-if="!hasRepos && userFound">No Repos</h2>
  <ul v-if="userFound && hasRepos">
    <li v-for="repo in repos">
      <RepoCard
        v-bind:owner="repo.owner"
        v-bind:name="repo.name"
        v-bind:link="repo.link"
        v-bind:fetchContentsURL="repo.fetchContentsURL"
        v-bind:forksCount="repo.forksCount"
        v-bind:fetchForksURL="repo.fetchForksURL"
      ></RepoCard>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin: 2rem;
}
li {
  margin: 0;
  height: 100%;
}
repo-card {
  display: block;
  height: 100%;
}
</style>
