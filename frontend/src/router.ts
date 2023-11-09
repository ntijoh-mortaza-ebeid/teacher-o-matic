import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import RepoList from "./views/RepoListView.vue";
import ForkList from "./views/ForkListView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/users/:user/repos", component: RepoList },
  { path: "/forklist", component: ForkList },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
