<script setup lang="ts">
import { AgentCardListing } from "@/components";
import { useAgentsStore } from "@/stores";

import { computed, onMounted, inject } from "vue";

const AgentsStore = useAgentsStore();

const agents = computed(() => {
  return AgentsStore.getAgents;
});

const mobile = inject<boolean>("isMobile", false);

onMounted(() => {
  AgentsStore.fill();
});
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center">
    <h2 class="mt-10 text-2xl font-semibold">Meet Agents</h2>

    <div
      class="flex flex-row m-4 p-2 max-w-7xl w-full overflow-x-auto"
      :class="mobile ? 'gap-4' : 'gap-12'"
    >
      <!-- THESE SHOULD FLEX COL ON MOBILE! !-->
      <AgentCardListing
        v-for="(agent, index) in agents"
        :key="index"
        :agent="agent"
        :class="mobile ? '' : 'w-[20%]'"
      />
    </div>
  </div>
</template>
