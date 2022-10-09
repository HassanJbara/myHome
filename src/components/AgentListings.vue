<script setup lang="ts">
import AgentCardListing from "./AgentCardListing.vue";
import { computed, onMounted } from "vue";
import { useAgentsStore } from "@/stores/AgentsStore";

const AgentsStore = useAgentsStore();

const agents = computed(() => {
  return AgentsStore.getAgents;
});

onMounted(() => {
  AgentsStore.fill();
});
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center">
    <h2 class="mt-10 text-2xl font-semibold">Meet Agents</h2>

    <div class="flex flex-row m-4 p-2 max-w-7xl gap-12 w-full overflow-x-auto">
      <!-- THESE SHOULD FLEX COL ON MOBILE! !-->
      <AgentCardListing
        v-for="(agent, index) in agents"
        :key="index"
        :agent="agent"
        class="w-[20%]"
      />
    </div>
  </div>
</template>

<style></style>
