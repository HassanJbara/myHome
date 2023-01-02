<script setup lang="ts">
import type { Home } from "@/modules";

import InlineSvg from "vue-inline-svg";

interface Props {
  home: Home;
}

defineProps<Props>();
</script>

<template>
  <router-link
    :to="{
      name: 'home-detail',
      params: { id: home.id },
    }"
  >
    <div class="card-image">
      <figure class="image is-4by3">
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
        <img :src="home.gallery_images[0]" alt="House Image" />
      </figure>
    </div>

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
          src="./icons/bedroom-icon.svg"
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
          src="./icons/bathroom-icon.svg"
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
          src="./icons/space-icon.svg"
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
