<script setup lang="ts">
import { ref, Ref } from "vue";
import { IManifest } from "../interfaces/IManifest.js";
import { IAssignmentTest } from "../interfaces/IAssignmentTest.js";
import useAssigemntStore from "../stores/AssignmentStore.js";

interface IGithubApiForkResponse {
  id: number;
  contents_url: string;
  html_url: string;
  name: string;
}

interface IForkCardInfo {
  id: number;
  name: string;
  link: string;
  submissionCode: string;
  submissionCodeFound: boolean;
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
  const fetchForksURL: string = assignmentStore.getFetchForksURL;
  const manifest: IManifest = assignmentStore.getManifest;

  const forksResponse: Response = await fetch(fetchForksURL);
  if (!forksResponse.ok) {
    // TODO error handling if repo has no forks
    return 1;
  }

  const repoForks: IGithubApiForkResponse[] = await forksResponse.json();

  const forkCardsInfoPromises: Promise<IForkCardInfo>[] = repoForks.map(
    async (fork: IGithubApiForkResponse) => {
      const submissionCodeURL: string = fork.contents_url.replace(
        "{+path}",
        manifest.filePath
      );

      const submissionCodeReponse: Response = await fetch(submissionCodeURL);
      const submissionCodeFound: boolean = submissionCodeReponse.status === 200;

      const submissionCode: string = submissionCodeFound
        ? atob((await submissionCodeReponse.json()).content)
        : "File specified in .manifest.json not found";

      return {
        id: fork.id,
        name: fork.name,
        link: fork.html_url,
        submissionCode: submissionCode,
        submissionCodeFound: submissionCodeFound,
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
../interfaces/IAssignmentTest
