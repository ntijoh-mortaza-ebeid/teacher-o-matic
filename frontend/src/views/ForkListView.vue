<script setup lang="ts">
import { ref, Ref } from "vue";
import { IManifest } from "../interfaces/IManifest";
import { IAssignmentTest } from "../interfaces/IAssingmentTest";
import useAssigemntStore from "../stores/AssignmentStore";

interface IGithubApiResponseFork {
  id: number;
  contents_url: string;
  html_url: string;
  name: string;
}

interface IForkCardInfo {
  id: number;
  name: string;
  link: string;
  assignmentCode: string;
  assignmentCodeFound: boolean;
  functionName: string;
  tests: IAssignmentTest[];
}

const assignmentStore = useAssigemntStore();

// TODO if assignment store is empty (get forks info from url)
// TODO if url does not match repo name in assignmentStore then reload assignmentStore data

const forkCards: Ref<IForkCardInfo[]> = ref([]);

loadForks();

// TODO make loadforks run when changing url

async function loadForks(): Promise<number> {
  const forksURL: string = assignmentStore.getFetchForksURL;
  const manifest: IManifest = assignmentStore.getManifest;

  const forksResponse: Response = await fetch(forksURL);
  if (!forksResponse.ok) {
    // TODO error handling if repo has no forks
    return 1;
  }

  const repoForks: IGithubApiResponseFork[] = await forksResponse.json();

  const forkCardsInfoPromises: Promise<IForkCardInfo>[] = repoForks.map(
    async (fork: IGithubApiResponseFork) => {
      const assignmentCodeURL: string = fork.contents_url.replace(
        "{+path}",
        manifest.filePath
      );

      const assignmentCodeReponse: Response = await fetch(assignmentCodeURL);
      const assignmentCodeFound: boolean = assignmentCodeReponse.status === 200;

      const assignmentCode: string = assignmentCodeFound
        ? atob((await assignmentCodeReponse.json()).content)
        : "File specified in .manifest.json not found";

      return {
        id: fork.id,
        name: fork.name,
        link: fork.html_url,
        assignmentCode: assignmentCode,
        assignmentCodeFound: assignmentCodeFound,
        functionName: manifest.functionName,
        tests: manifest.tests,
      };
    }
  );

  Promise.all(forkCardsInfoPromises).then((forkCardsInfo) => {
    forkCards.value = forkCardsInfo;
    console.log(forkCards.value);
  });

  return 0;
}
</script>

<template></template>

<style scoped></style>
