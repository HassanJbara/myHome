<script lang="ts" setup>
import { home_features } from "@/modules";

import _ from "lodash";
import {
  NSpace,
  NCollapse,
  NCollapseItem,
  NCheckbox,
  NCheckboxGroup,
} from "naive-ui";

interface Props {
  type?: "vertical" | "horizontal";
  homeFeatures: string[] | undefined;
}

withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

function update(e: (string | number)[]) {
  emit("update:home-features", e);
  emit("input");
}

const emit = defineEmits<{
  (e: "update:home-features", value: (string | number)[]): void;
  (e: "input"): void;
}>();
</script>

<template>
  <n-collapse
    v-show="type == 'vertical'"
    arrow-placement="right"
    class="mt-4"
    :theme-overrides="{ titleFontSize: '18px', titleFontWeight: '600' }"
  >
    <n-collapse-item title="Features" name="1">
      <n-checkbox-group :value="homeFeatures" @update:value="update($event)">
        <n-space item-style="display: flex; justify-content: space-between;">
          <n-checkbox
            v-for="feature in home_features"
            :key="feature"
            :value="feature"
            :label="_.startCase(feature)"
          />
        </n-space>
      </n-checkbox-group>
    </n-collapse-item>
  </n-collapse>
</template>
