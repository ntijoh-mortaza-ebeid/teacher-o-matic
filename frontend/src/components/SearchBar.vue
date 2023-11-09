<script setup lang="ts">
import { ref } from "vue";
import router from "../router.ts";

const searchedUser = ref("");
</script>

<template>
  <!--Import Google Icon Font-->
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />

  <!-- Compiled and minified CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
  />

  <nav>
    <div class="nav-wrapper">
      <form @submit.prevent="router.push(`/users/${searchedUser}/repos`)">
        <div class="input-field">
          <input type="search" v-model="searchedUser" required />
          <label class="label-icon" for="search">
            <i class="material-icons">person_search</i>
          </label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
</template>

<style scoped></style>
../index.ts