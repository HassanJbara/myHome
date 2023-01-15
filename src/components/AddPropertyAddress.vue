<script lang="ts" setup>
import type { AddHomeAddress } from "@/modules";

interface Props {
  modelValue: AddHomeAddress;
}

const props = defineProps<Props>();

function update(key: keyof AddHomeAddress, e: Event) {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: (e.target as HTMLInputElement).value,
  });
}

const emit = defineEmits<{
  (e: "update:modelValue", homeInfo: AddHomeAddress): void;
}>();
</script>

<template>
  <!-- city -->
  <div class="field flex flex-col w-[80%] self-center">
    <label class="label"> City </label>
    <div class="control">
      <input
        class="input"
        type="text"
        :value="modelValue.city"
        @input="update('city', $event)"
        placeholder="city"
        required
      />
    </div>
  </div>

  <!-- Street -->
  <div class="field flex flex-col w-[80%] self-center">
    <label class="label"> Street </label>
    <div class="control">
      <input
        class="input"
        type="text"
        :value="modelValue.street"
        @input="update('street', $event)"
        placeholder="street"
        required
      />
    </div>
  </div>

  <!-- House Number -->
  <div class="field flex flex-col w-[80%] self-center">
    <label class="label"> House Number </label>
    <div class="control">
      <input
        class="input"
        type="number"
        :value="modelValue.house_number"
        @input="update('house_number', $event)"
        placeholder="house number"
        required
      />
    </div>
  </div>

  <!-- PLZ -->
  <div class="field flex flex-col w-[80%] self-center">
    <label class="label"> PLZ </label>
    <div class="control">
      <input
        class="input"
        type="number"
        :value="modelValue.plz"
        @input="update('plz', $event)"
        placeholder="plz"
        min="10000"
        max="99999"
        required
      />
    </div>
  </div>
</template>
