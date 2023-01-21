<script lang="ts" setup>
import type { HomeFeatures } from "@/modules";

import _ from "lodash";

interface Props {
  modelValue: HomeFeatures;
}

const props = defineProps<Props>();

function update(key: keyof HomeFeatures, e: Event) {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: (e.target as HTMLInputElement).value === "on" ? true : false,
  });
}

const emit = defineEmits<{
  (e: "update:modelValue", homeInfo: HomeFeatures): void;
}>();
</script>

<template>
  <div class="flex flex-row flex-wrap mt-4 mb-2 w-[80%] self-center">
    <label
      class="checkbox m-8 font-semibold"
      v-for="(value, label, index) in modelValue"
      :key="index"
    >
      <input type="checkbox" @change="update(label, $event)" />
      {{ _.startCase(label) }}
    </label>
  </div>
</template>
