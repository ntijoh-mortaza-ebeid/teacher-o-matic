<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
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

  <search-bar></search-bar>
  <router-view></router-view>
</template>

<style scoped></style>
