<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import type { Agent } from "@/modules/agents";

interface Props {
  agent: Agent | undefined;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="flex flex-col bg-[#fafafa] mx-2 rounded-md">
    <div class="m-2 flex flex-row">
      <figure class="image is-128x128">
        <img :src="props.agent?.agent_img" class="rounded-md max-h-[100%]" />
      </figure>
      <div class="mx-2 text-left">
        <span class="font-semibold text-xl">{{ props.agent?.agent_name }}</span>
        <br />
        <span>{{ props.agent?.agent_job }}</span>
        <br />
        <br />
        <span>Phone: {{ props.agent?.agent_phone }}</span>
        <br />
        <span>Email: {{ props.agent?.agent_email }}</span>
      </div>
    </div>
    <div class="flex flex-row gap-2 m-2">
      <inline-svg src="./icons/facebook.svg" width="25" height="25" />
      <inline-svg src="./icons/twitter.svg" width="25" height="25" />
    </div>
  </div>
</template>

<style></style>
