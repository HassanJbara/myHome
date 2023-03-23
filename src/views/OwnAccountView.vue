<script setup lang="ts">
import {
  SiteHeader,
  SiteFooter,
  MyInfo,
  MyWishlist,
  MyAds,
} from "@/components";
import { useAuthStore } from "@/stores";
import router from "@/router";

import InlineSvg from "vue-inline-svg";
import { NLayout, NLayoutSider, NMenu, NButton } from "naive-ui";
import { h, ref } from "vue";

const activeKey = ref<string | null>(null);

const authStore = useAuthStore();

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
            fill: getIconFill("ads"),
          }),
      },
    ],
  },
];

const user = authStore.getUser;

function logout() {
  authStore.LOGOUT().then(() => {
    router.push("/");
  });
}
</script>

<template>
  <body>
    <SiteHeader :with-search="false" />

    <n-layout has-sider class="h-[73vh]">
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

        <n-button
          class="w-3/4 ml-5 my-4 bottom-0 absolute bg-[#FF3860]"
          color="#FF3860"
          size="large"
          strong
          @click="logout()"
        >
          Log Out
        </n-button>
      </n-layout-sider>

      <n-layout>
        <Transition
          mode="out-in"
          enter-active-class="duration-300 ease-out transition-all"
          enter-from-class="translate-y-7 opacity-0"
          leave-active-class="duration-300 ease-out transition-all"
          leave-to-class="-translate-y-7 opacity-0"
        >
          <MyInfo :user="user" v-if="activeKey === 'my-info'" />

          <MyWishlist
            :homes="user ? user.wishlisted : []"
            v-else-if="activeKey === 'wishlist'"
          />

          <MyAds
            :homes="user ? user.created : []"
            v-else-if="activeKey === 'ads'"
          />
        </Transition>
      </n-layout>
    </n-layout>

    <SiteFooter class="mt-0" />
  </body>
</template>
