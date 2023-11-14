import { defineStore } from "pinia";
import { IManifest } from "../interfaces/IManifest";

interface IAssigment {
  fetchForksURL: string;
  manifest: IManifest;
}

const useAssigemntStore = defineStore("AssigemntStore", {
  state: () => {
    return { fetchForksURL: "", manifest: {} } as IAssigment;
  },
  actions: {
    setFetchForksURL(fetchForksURL: string): void {
      this.fetchForksURL = fetchForksURL;
    },
    setManifest(manifest: IManifest): void {
      this.manifest = manifest;
    },
  },
  getters: {
    getFetchForksURL(): string {
      return this.fetchForksURL;
    },
    getManifest(): IManifest {
      return this.manifest;
    },
    // TODO add repo name to be able to check if url and assingment repo name matches
  },
});

export default useAssigemntStore;
