<!-- <script setup lang="ts">
import { ref } from "vue";

interface Props {
  choices: Array<string> | Array<number>;
  label: string;
  type?: "vertical" | "horizontal";
}

const props = withDefaults(defineProps<Props>(), {
  choices: () => {
    return [];
  },
  label: "",
  type: "horizontal",
});

const value = ref<string>();
</script>

<template>
  <div
    class="flex gap-2"
    :class="props.type == 'horizontal' ? 'flex-row' : 'flex-col'"
  >
    <span class="font-semibold self-center">{{ props.label }}:</span>
    <span class="select">
      <select
        name="type"
        id="type"
        class="w-full"
        v-model="value"
        @change="$emit('update:modelValue', value)"
      >
        <option
          v-for="(choice, index) in props.choices"
          :key="index"
          :value="choice"
        >
          {{ choice }}
        </option>
      </select>
    </span>
  </div>
</template>

<style></style> -->
