<script lang="ts" setup>
import { NSpace, NSlider, NCollapseTransition } from "naive-ui";

interface Props {
  type?: "vertical" | "horizontal";
  propertyType: string | undefined;
  rent: number | undefined;
}

withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

function update(e: number) {
  emit("update:rent", e);
}

const emit = defineEmits<{
  (e: "update:rent", value: number): void;
}>();

function formatTooltip(value: number) {
  return value.toLocaleString() + "€";
}
</script>

<template>
  <n-collapse-transition
    :show="!!propertyType || type == 'horizontal'"
    :class="type == 'vertical' ? 'mt-3' : 'w-1/3'"
  >
    <n-space v-show="!!propertyType || type == 'horizontal'" vertical>
      <span class="font-semibold self-center">
        {{ propertyType == "RENT" ? "Rent" : "Price" }}
      </span>
      <n-slider
        :value="rent"
        @update:value="update($event)"
        :step="propertyType == 'RENT' ? 5 : 1000"
        :max="propertyType == 'RENT' ? 2000 : 10000000"
        :min="propertyType == 'RENT' ? 100 : 100000"
        :format-tooltip="formatTooltip"
        class="mt-2"
      />
    </n-space>
  </n-collapse-transition>
</template>
