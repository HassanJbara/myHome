import { defineStore } from "pinia";
import api from "@/api";
import type { Agent } from "@/modules/agents";

export interface AgentsStoreState {
  agents: Agent[];
}

export const defaultState = (): AgentsStoreState => {
  return {
    agents: [],
  };
};

export const useAgentsStore = defineStore("AgentsStore", {
  state: defaultState,
  actions: {
    async fill() {
      try {
        const data = await api.agents.getAll();
        this.agents = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getAgents: (state) => {
      return state.agents;
    },
    getAgentByID:
      (state) =>
      (search_id: number): Agent | undefined =>
        state.agents.find((a) => a.id == search_id),
  },
});
