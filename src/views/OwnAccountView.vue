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
import type { Home, User } from "@/modules";

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
            fill: getIconFill("ads"),
          }),
      },
    ],
  },
];

const wishlistHomes: Home[] = [
  {
    id: 0,
    home_name: "home 1",
    home_type: "APPARTMENT",
    address: {
      city: "leipzig",
      house_number: 15,
      plz: "00000",
      street: "street",
      position: { lat: 0, lng: 0 },
    },
    agent: {
      id: 0,
      agent_email: "",
      agent_facebook: "",
      agent_img: "",
      agent_job: "",
      agent_phone: "",
      agent_name: "",
      agent_twitter: "",
    },
    features: {
      balcony: false,
      clubhouse: false,
      dishwasher: false,
      elevator: false,
      fitness_center: false,
      modern_kitchen: false,
      pet_friendly: false,
      pool: false,
      spa: false,
    },
    gallery_images: [
      "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
    ],
    listing_text: "",
    property_type: "RENT",
    rent: 220,
    specifications: {
      baths: 0,
      rooms: 0,
      space: 0,
    },
  },
  {
    id: 1,
    home_name: "home 1",
    home_type: "APPARTMENT",
    address: {
      city: "leipzig",
      house_number: 15,
      plz: "00000",
      street: "street",
      position: { lat: 0, lng: 0 },
    },
    agent: {
      id: 0,
      agent_email: "",
      agent_facebook: "",
      agent_img: "",
      agent_job: "",
      agent_phone: "",
      agent_name: "",
      agent_twitter: "",
    },
    features: {
      balcony: false,
      clubhouse: false,
      dishwasher: false,
      elevator: false,
      fitness_center: false,
      modern_kitchen: false,
      pet_friendly: false,
      pool: false,
      spa: false,
    },
    gallery_images: [
      "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
    ],
    listing_text: "",
    property_type: "RENT",
    rent: 220,
    specifications: {
      baths: 0,
      rooms: 0,
      space: 0,
    },
  },
  {
    id: 2,
    home_name: "home 1",
    home_type: "APPARTMENT",
    address: {
      city: "leipzig",
      house_number: 15,
      plz: "00000",
      street: "street",
      position: { lat: 0, lng: 0 },
    },
    agent: {
      id: 0,
      agent_email: "",
      agent_facebook: "",
      agent_img: "",
      agent_job: "",
      agent_phone: "",
      agent_name: "",
      agent_twitter: "",
    },
    features: {
      balcony: false,
      clubhouse: false,
      dishwasher: false,
      elevator: false,
      fitness_center: false,
      modern_kitchen: false,
      pet_friendly: false,
      pool: false,
      spa: false,
    },
    gallery_images: [
      "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
    ],
    listing_text: "",
    property_type: "RENT",
    rent: 220,
    specifications: {
      baths: 0,
      rooms: 0,
      space: 0,
    },
  },
  {
    id: 3,
    home_name: "home 1",
    home_type: "APPARTMENT",
    address: {
      city: "leipzig",
      house_number: 15,
      plz: "00000",
      street: "street",
      position: { lat: 0, lng: 0 },
    },
    agent: {
      id: 0,
      agent_email: "",
      agent_facebook: "",
      agent_img: "",
      agent_job: "",
      agent_phone: "",
      agent_name: "",
      agent_twitter: "",
    },
    features: {
      balcony: false,
      clubhouse: false,
      dishwasher: false,
      elevator: false,
      fitness_center: false,
      modern_kitchen: false,
      pet_friendly: false,
      pool: false,
      spa: false,
    },
    gallery_images: [
      "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
    ],
    listing_text: "",
    property_type: "RENT",
    rent: 220,
    specifications: {
      baths: 0,
      rooms: 0,
      space: 0,
    },
  },
];

const user: User = {
  id: 0,
  username: "alex",
  email: "my@email.com",
  adsHomes: [],
  wishlistedHomes: wishlistHomes,
};
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
            :homes="user.wishlistedHomes"
            v-else-if="activeKey === 'wishlist'"
          />
          <MyAds :homes="user.adsHomes" v-else-if="activeKey === 'ads'" />
        </Transition>
      </n-layout>
    </n-layout>

    <SiteFooter class="mt-0" />
  </body>
</template>
