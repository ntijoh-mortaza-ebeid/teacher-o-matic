import { defineStore } from "pinia";

interface IEverything {
  searchedUser: string;
}

const useEverythingStore = defineStore("EverythingStore", {
  state: () => {
    return { searchedUser: "" } as IEverything;
  },
  actions: {
    searchUser(searchedUser: string): void {
      this.searchedUser = searchedUser;
    },
  },
  getters: {
    getSearchedUser(): string {
      return this.searchedUser;
    },
  },
});

export default useEverythingStore;
