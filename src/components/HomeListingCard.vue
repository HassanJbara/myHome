<script setup lang="ts">
import type { Home } from "@/modules";
import api from "@/api";
import { useAuthStore } from "@/stores";

import InlineSvg from "vue-inline-svg";
import { NCarousel, NButton, useMessage } from "naive-ui";
import { inject, ref, computed } from "vue";
import { storeToRefs } from "pinia";

interface Props {
  home: Home;
  type?: "tall" | "wide";
  showAgent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "tall",
  showAgent: true,
});

const mobile = inject<boolean>("isMobile", false);
const showHeart = ref<boolean>(false);

const authStore = useAuthStore();
const msg = useMessage();
const { user } = storeToRefs(authStore);

const wishlistedRef = computed(() => {
  if (user.value) {
    return (
      user.value.wishlisted.filter((h) => h.id == props.home.id).length > 0
    );
  } else {
    return undefined;
  }
});

function wishlist() {
  if (authStore.getUser) {
    api.homes
      .wishlistProperty(
        {
          wishlisted_home_id: props.home.id,
          wishlisting_user_id: authStore.getUser.id,
        },
        authStore.getToken
      )
      .then(() => {
        authStore.ADD_TO_WISHLIST()?.then(() => {
          if (wishlistedRef.value) msg.info("Home Wishlisted");
          else msg.info("Home removed from wishlist.");
        });
      });
  }
}
</script>

<template>
  <div
    class="card"
    v-if="type == 'tall'"
    @mouseover="showHeart = true"
    @mouseleave="showHeart = false"
  >
    <div class="card-image">
      <div
        class="z-50 text-white font-semibold absolute left-0 top-0 p-1 rounded-sm"
        :class="
          home.property_type == 'RENT'
            ? 'has-background-primary'
            : 'has-background-danger'
        "
      >
        {{ home.property_type }}
      </div>

      <n-button
        v-if="authStore.isAuthenticated"
        class="z-50 absolute top-0 right-0 p-4 ease-in-out duration-300"
        :class="showHeart ? '  opacity-1' : ' opacity-0'"
        text
        style="font-size: 24px"
        @click="wishlist()"
      >
        <InlineSvg
          :src="
            wishlistedRef
              ? '/icons/heart-solid.svg'
              : '/icons/heart-regular.svg'
          "
          width="30"
          height="30"
          fill="#ff6e8b"
        />
      </n-button>

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
          class="w-full h-80"
          :src="img"
        />
      </n-carousel>
    </div>

    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-half">
            <router-link
              class="font-bold"
              :to="{
                name: 'home-detail',
                params: { id: home.id },
              }"
            >
              <h2>{{ home.address.city }}</h2>
              <h4>{{ home.address.street }}</h4>
            </router-link>
          </div>
          <div class="column is-half">
            <div class="mb-4 text-center">
              <span class="font-bold text-lg">{{ home.rent }}€</span>
              <span> {{ home.property_type == "RENT" ? " / mo" : "" }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="media"
        :class="mobile ? 'flex flex-col' : ''"
        v-show="showAgent"
      >
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="home.agent?.agent_img"
              alt="Agent Image"
              class="rounded-lg"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ home.agent?.agent_name }}</p>
          <p class="subtitle is-5">{{ home.agent?.agent_twitter }}</p>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <span class="card-footer-item">
        <inline-svg
          src="/icons/bedroom-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ home.specifications.rooms }}
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="/icons/bathroom-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ home.specifications.baths }}
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="/icons/space-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ home.specifications.space }} m<sup>2</sup>
        </span>
      </span>
    </footer>
  </div>

  <div class="card flex flex-row h-[20%]" v-else>
    <img :src="home.gallery_images[0]" alt="" class="is-4by3 max-w-[35%]" />
    <div
      class="z-50 text-white rounded-sm font-semibold absolute left-0 top-0 p-1 m-4"
      :class="
        home.property_type == 'RENT'
          ? 'has-background-primary'
          : 'has-background-danger'
      "
    >
      {{ home.property_type }}
    </div>

    <div class="w-full">
      <router-link
        class="has-text-black text-center"
        :to="{
          name: 'home-detail',
          params: { id: home.id },
        }"
      >
        <h2 class="mx-2 mt-2 font-bold text-lg">
          {{ home.address.city }}
        </h2>

        <h3 class="mx-2 font-semibold">
          {{ home.address.street }} {{ home.address.house_number }}
        </h3>
        <h3 class="mx-2 font-semibold">
          {{ home.address.plz }}
        </h3>

        <div class="card-content h-40 overflow-clip">
          {{ home.listing_text }}
        </div>

        <div
          class="mb-4 w-full text-center flex flex-row items-center justify-between px-20"
        >
          <div>
            <span class="font-bold text-lg">{{ home.home_type }}</span>
          </div>
          <div>
            <span class="font-bold text-lg">{{ home.rent }}€</span>
            <span>{{ home.property_type == "RENT" ? " / mo" : "" }}</span>
          </div>
        </div>

        <footer class="card-footer">
          <span class="card-footer-item">
            <inline-svg
              src="/icons/bedroom-icon.svg"
              width="20"
              height="20"
              class="mr-2"
            />
            {{ home.specifications.rooms }}
          </span>
          <span class="card-footer-item">
            <inline-svg
              src="/icons/bathroom-icon.svg"
              width="20"
              height="20"
              class="mr-2"
            />
            {{ home.specifications.baths }}
          </span>
          <span class="card-footer-item">
            <inline-svg
              src="/icons/space-icon.svg"
              width="20"
              height="20"
              class="mr-2"
            />
            {{ home.specifications.space }} m<sup>2</sup>
          </span>
        </footer>
      </router-link>
    </div>
  </div>
</template>
