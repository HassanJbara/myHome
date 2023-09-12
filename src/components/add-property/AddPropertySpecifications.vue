<script lang="ts" setup>
// import { useAddProperty } from "@/composables";
import type { HomeSpecifications } from "@/modules";

import _ from "lodash";

interface Props {
  modelValue: HomeSpecifications;
}

const props = defineProps<Props>();

// const { changeSpecification } = useAddProperty();

function update(key: keyof HomeSpecifications, e: Event) {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: (e.target as HTMLInputElement).value,
  });
}

const emit = defineEmits<{
  (e: "update:modelValue", homeInfo: HomeSpecifications): void;
}>();
</script>

<template>
  <div class="field flex flex-row flex-wrap gap-4 mt-4 self-center is-grouped">
    <div
      v-for="(value, label, index) in modelValue"
      :key="index"
      class="flex flex-col"
    >
      <label class="label">{{ _.capitalize(label) }}</label>
      <div class="control">
        <input
          class="input"
          :id="label"
          type="number"
          min="1"
          :placeholder="label"
          @change="update(label, $event)"
          required
        />
      </div>
    </div>
  </div>
</template>
