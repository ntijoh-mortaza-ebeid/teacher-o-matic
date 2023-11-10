import { defineStore } from "pinia";

interface IManifest {
  assignmentName: string;
  filePath: string;
  language: string;
  functionName: string;
  functionArity: number;
  tests: [];
}

interface IAssigment {
  fetchForksURL: string;
  manifest: {};
}

const useAssigemntStore = defineStore("AssigemntStore", {
  state: () => {
    return {} as IAssigment;
  },
  getters: {
    fetchForksURL(): string {
      return this.fetchForksURL;
    },
    fetchManifest(): object {
      return this.manifest;
    },
  },
  actions: {
    setForksURL(url: string): void {
      this.fetchForksURL = url;
    },
    setManifest(manifest: object): void {
      this.manifest = manifest;
    },
  },
});

export default useAssigemntStore;
