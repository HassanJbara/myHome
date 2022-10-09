import { defineStore } from "pinia";
import api from "@/api";
import type { Home, HomesSearch } from "@/modules/homes";

export interface HomesStoreState {
  homes: Home[];
  searchedHomes: Home[];
}

export const defaultState = (): HomesStoreState => {
  return {
    homes: [],
    searchedHomes: [],
  };
};

export const useHomesStore = defineStore("HomesStore", {
  state: defaultState,
  actions: {
    async fill() {
      try {
        const data = await api.homes.getAll();
        this.homes = data.data;
        // this.searchedHomes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async search(searchParams?: HomesSearch) {
      try {
        const data = await api.homes.getSearch(searchParams);
        this.searchedHomes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    clearSearch() {
      this.searchedHomes = [];
    },
  },
  getters: {
    getHomes: (state) => {
      return state.homes;
    },
    getSearchedHomes: (state) => {
      return state.searchedHomes;
    },
    getHomeByID:
      (state) =>
      (search_id: number): Home | undefined =>
        state.homes.find((h) => h.id == search_id),
  },
});
