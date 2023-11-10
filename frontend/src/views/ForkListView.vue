<script setup lang="ts">

const forksURL = "https://api.github.com/repos/ntijoh-lukas-johansson/for-p2-1/forks";

const manifest = `{
    "assignmentName": "Smallest of Two",
    "filePath": "lib/smallest_of_two.js",
    "language": "javascript",
    "functionName": "smallestOfTwo",
    "functionArity": 2,
    "tests": [
        {"description": "First is smallest",
        "arguments": [1,2],
        "expected": 1},
        {"description": "Second is smallest",
        "arguments": [2,1],
        "expected": 1},
        {"description": "Same size",
        "arguments": [2,2],
        "expected": 2}
    ]
    }`

const options = "key";

  async function loadForks() {
    const forksResponse = await fetch(forksURL, options);
    const forks = await forksResponse.json();

  }

</script>



<template></template>

<style scoped></style>
