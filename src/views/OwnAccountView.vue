<script setup lang="ts">
import {
  SiteHeader,
  SiteFooter,
  MyInfo,
  MyWishlist,
  MyAds,
} from "@/components";

import InlineSvg from "vue-inline-svg";
import { NLayout, NLayoutSider, NMenu } from "naive-ui";
import { h, ref } from "vue";

const activeKey = ref<string | null>(null);

function getIconFill(value: string) {
  return value === activeKey.value ? "white" : "black";
}

const menuOptions = [
  {
    label: "My Info",
    key: "my-info",
    icon: () =>
      h(InlineSvg, {
        src: "/icons/user-regular.svg",
        width: "20",
        height: "20",
        fill: getIconFill("my-info"),
      }),
  },
  {
    label: "My Properties",
    key: "properties",
    icon: () =>
      h(InlineSvg, {
        src: "/icons/house.svg",
        width: "20",
        height: "20",
        fill: getIconFill("properties"),
      }),
    children: [
      {
        label: "Wishlist",
        key: "wishlist",
        icon: () =>
          h(InlineSvg, {
            src: "/icons/heart-regular.svg",
            width: "20",
            height: "20",
            fill: getIconFill("wishlist"),
          }),
      },
      {
        label: "Created Ads",
        key: "ads",
        icon: () =>
          h(InlineSvg, {
            src: "/icons/house-sale.svg",
            width: "20",
            height: "20",
            fill: getIconFill("created"),
          }),
      },
    ],
  },
];
</script>

<template>
  <main>
    <SiteHeader :with-search="false" />

    <n-layout has-sider class="h-[66vh]">
      <n-layout-sider
        bordered
        :width="240"
        :native-scrollbar="false"
        class="h-full"
      >
        <n-menu
          v-model:value="activeKey"
          :options="menuOptions"
          class="h-full"
          :theme-overrides="{
            itemColorActive: '#3273dc',
            itemTextColorActive: 'white',
            itemColorActiveHover: '#3e8ed0',
            itemTextColorActiveHover: 'white',
            itemTextColorChildActive: '#3273dc',
            itemTextColorChildActiveHover: '3e8ed0',
            arrowColorChildActive: '#3273dc',
            arrowColorChildActiveHover: '3e8ed0',
          }"
        />
      </n-layout-sider>

      <n-layout>
        <MyInfo v-if="activeKey === 'my-info'" />
        <MyWishlist v-else-if="activeKey === 'wishlist'" />
        <MyAds v-else-if="activeKey === 'ads'" />
      </n-layout>
    </n-layout>

    <SiteFooter class="mt-0" />
  </main>
</template>
