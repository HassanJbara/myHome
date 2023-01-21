<script lang="ts" setup>
import { NSpace, NInput } from "naive-ui";

interface Props {
  type?: "vertical" | "horizontal";
  city: string | undefined;
}

withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

function update(e: string) {
  emit("update:city", e);
}

const emit = defineEmits<{
  (e: "update:city", value: string): void;
}>();
</script>

<template>
  <n-space vertical size="medium" :class="type == 'vertical' ? '' : 'w-1/3'">
    <span class="font-semibold self-center">City:</span>
    <n-input
      :value="city"
      @input="update($event)"
      type="text"
      placeholder="City"
      clearable
    />
  </n-space>
</template>
