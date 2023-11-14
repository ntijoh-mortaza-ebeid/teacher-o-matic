<script setup lang="ts">
import { ref, Ref } from "vue";
import { IManifest } from "../interfaces/IManifest.js";
import { IAssignmentTest } from "../interfaces/IAssignmentTest.js";
import useAssigemntStore from "../stores/AssignmentStore.js";

interface IGithubApiFork {
  id: number;
  contents_url: string;
  html_url: string;
  name: string;
}

interface ISubmissionCard {
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

const submissionCards: Ref<ISubmissionCard[]> = ref([]);

loadSubmissions();

// TODO make loadSubmissions run when changing url

async function loadSubmissions(): Promise<number> {
  const fetchForksURL: string = assignmentStore.getFetchForksURL;
  const manifest: IManifest = assignmentStore.getManifest;

  const forksResponse: Response = await fetch(fetchForksURL);
  if (!forksResponse.ok) {
    // TODO error handling if repo has no forks
    return 1;
  }

  const forks: IGithubApiFork[] = await forksResponse.json();

  const submissionCardsPromises: Promise<ISubmissionCard>[] = forks.map(
    async (fork: IGithubApiFork) => {
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

  Promise.all(submissionCardsPromises).then((loadedSubmissionCards) => {
    submissionCards.value = loadedSubmissionCards;
    console.log(submissionCards.value);
  });

  return 0;
}
</script>

<template></template>

<style scoped></style>
../interfaces/IAssignmentTest
