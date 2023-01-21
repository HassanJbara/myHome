<script lang="ts" setup>
import { home_types, property_types } from "@/modules";
import type { HomeInfo } from "@/modules";

import InlineSvg from "vue-inline-svg";
import _ from "lodash";

interface Props {
  modelValue: HomeInfo;
}

const props = defineProps<Props>();

function update(key: keyof HomeInfo, e: Event) {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: (e.target as HTMLInputElement).value,
  });
}

const emit = defineEmits<{
  (e: "update:modelValue", homeInfo: HomeInfo): void;
}>();
</script>

<template>
  <div
    class="field flex flex-row flex-wrap mt-4 w-full items-center justify-center"
  >
    <div class="flex flex-row gap-8 w-full self-center justify-center">
      <div class="flex flex-col w-2/5">
        <label class="label">Listing Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            :value="modelValue.home_name"
            @input="update('home_name', $event)"
            required
          />
        </div>
      </div>
      <div class="flex flex-col w-1/5">
        <label class="label">Property Type</label>
        <div class="select w-full">
          <select
            class="w-full"
            :value="modelValue.home_type"
            @input="update('home_type', $event)"
          >
            <option
              v-for="(option, index) in home_types"
              :key="index"
              :value="option"
            >
              {{ _.capitalize(option) }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col w-1/5">
        <label class="label">Listing Type</label>
        <div class="select">
          <select
            class="w-full"
            :value="modelValue.property_type"
            @input="update('property_type', $event)"
          >
            <option
              v-for="(option, index) in property_types"
              :key="index"
              :value="option"
            >
              {{ _.capitalize(option) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Rent -->
    <div class="flex flex-row gap-8 mt-4 w-full self-center justify-center">
      <div class="flex flex-col">
        <label class="label">Rent</label>
        <div class="control has-icons-right">
          <input
            class="input"
            type="number"
            :value="modelValue.rent"
            @input="update('rent', $event)"
            placeholder="rent "
            min="100"
          />
          <span class="icon is-small is-right">
            <inline-svg
              src="/icons/euro.svg"
              fill="#B3E0FF"
              width="50%"
              height="50%"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
