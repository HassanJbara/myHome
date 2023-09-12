<script setup lang="ts">
import type { Home } from "@/modules";

import InlineSvg from "vue-inline-svg";
import { NCarousel } from "naive-ui";

interface Props {
  home: Home;
}

defineProps<Props>();
</script>

<template>
  <div class="card-image w-80 h-60">
    <div
      class="z-50 text-white font-semibold absolute left-0 top-0 p-1 text-base rounded-br-lg"
      :class="
        home.property_type == 'RENT'
          ? 'has-background-primary'
          : 'has-background-danger'
      "
    >
      {{ home.property_type }}
    </div>
    <n-carousel
      :show-arrow="home.gallery_images.length > 1"
      :show-dots="home.gallery_images.length > 1"
      dot-type="line"
      :interval="4000"
      draggable
    >
      <img
        v-for="(img, _) in home.gallery_images"
        :key="_"
        class="w-full h-full"
        :src="img"
      />
    </n-carousel>
  </div>
  <router-link
    :to="{
      name: 'home-detail',
      params: { id: home.id },
    }"
  >
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-two-thirds">
            <h2>{{ home.address.city }}</h2>
            <h4>{{ home.address.street }} {{ home.address.house_number }}</h4>
            <span class="text-black font-semibold">{{ home.address.plz }}</span>
          </div>
          <div class="column is-one-third">
            <div class="mb-4 text-center">
              <span class="font-bold text-lg text-black">{{ home.rent }}€</span>
              <span class="text-black">
                {{ home.property_type == "RENT" ? " / mo" : "" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <span class="card-footer-item">
        <inline-svg
          src="/icons/bedroom-icon.svg"
          width="22"
          height="22"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden text-black">
          {{ home.specifications.rooms }}
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="/icons/bathroom-icon.svg"
          width="22"
          height="22"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden text-black">
          {{ home.specifications.baths }}
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="/icons/space-icon.svg"
          width="22"
          height="22"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden text-black">
          {{ home.specifications.space }} m<sup>2</sup>
        </span>
      </span>
    </footer>
  </router-link>
</template>
