<script setup lang="ts">
import { NCard } from "naive-ui";

interface Props {
  img?: string;
}

defineProps<Props>();
</script>
<template>
  <img :src="img" class="max-w-[200px] max-h-[200px]" />
</template>
