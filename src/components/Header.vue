<script setup lang="ts">
import { Search, MainMenu } from "@/components";

interface Props {
  withSearch: boolean;
}

withDefaults(defineProps<Props>(), {
  withSearch: true,
});
</script>

<template>
  <header class="bg-[#3e8ed0] h-[30%] relative flex flex-col">
    <MainMenu />
    <span
      v-if="withSearch"
      class="text-white text-center text-3xl mx-4 mt-12 font-bold"
      >Find the Best Property for Rent or Sale</span
    >
    <Search v-if="withSearch" class="overflow-x-auto rounded-md bg-white" />
  </header>
</template>
