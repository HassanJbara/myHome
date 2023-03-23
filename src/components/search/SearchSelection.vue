<script lang="ts" setup>
import { NSpace, NSelect } from "naive-ui";

interface Props {
  type?: "vertical" | "horizontal";
  title: string;
  choice: string | number | undefined;
  options: { value: number | string; label: string }[];
}

withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

function update(e: string) {
  emit("update:choice", e);
}

const emit = defineEmits<{
  (e: "update:choice", value: string | number): void;
}>();
</script>

<template>
  <n-space
    vertical
    size="medium"
    :class="type == 'vertical' ? 'mt-4' : 'w-1/5'"
  >
    <span class="font-semibold self-center">{{ title }}:</span>
    <n-select
      :value="choice"
      @update-value="update($event)"
      :options="options"
      clearable
    />
  </n-space>
</template>
