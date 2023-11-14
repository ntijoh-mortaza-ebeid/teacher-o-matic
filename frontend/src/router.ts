import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import RepoList from "./views/RepoListView.vue";
import SubmissionListView from "./views/SubmissionListView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users/:user/repos", component: RepoList },
  { path: "/repos/:owner/:repo/forks", component: SubmissionListView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
