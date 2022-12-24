<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import type { Agent } from "@/modules";

interface Props {
  agent: Agent;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="props.agent.agent_img" alt="Agent Image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content overflow-hidden">
          <p class="title is-4">{{ props.agent.agent_name }}</p>
          <p class="subtitle is-6">{{ props.agent.agent_job }}</p>
        </div>
      </div>
      <div class="flex flex-row gap-2 m-2">
        <inline-svg src="./icons/facebook.svg" width="25" height="25" />
        <inline-svg src="./icons/twitter.svg" width="25" height="25" />
      </div>
    </div>
  </div>
</template>

<style></style>
