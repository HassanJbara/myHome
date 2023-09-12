import { defineStore } from "pinia";
import api from "@/api";
// import type { Home, HomesSearch } from "@/modules/homes";

export interface MapsStoreState {
  maps: { placeId: number };
}

export const defaultState = (): MapsStoreState => {
  return {
    maps: { placeId: 0 },
  };
};

export const useMapsStore = defineStore("MapsStore", {
  state: defaultState,
  actions: {
    async getPlaceID(location: string, key: string) {
      try {
        const response = await api.homes.getPlaceID(location, key);
        console.log(response);
        this.maps.placeId = response.data.results.place_id;
      } catch (error) {
        console.log(error);
        return "";
      }
    },
  },
  getters: {
    getMaps: (state) => {
      return state.maps;
    },
  },
});
