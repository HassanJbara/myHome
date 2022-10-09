<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import type { Home } from "@/modules/homes";

interface Props {
  home: Home;
  type?: "tall" | "wide";
}

const props = withDefaults(defineProps<Props>(), {
  type: "tall",
});
</script>

<template>
  <div class="card" v-if="props.type == 'tall'">
    <router-link
      :to="{
        name: 'home-detail',
        params: { id: props.home.id },
      }"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <div
            class="z-50 text-white font-semibold absolute left-0 top-0 p-1 rounded-sm"
            :class="
              props.home.property_type == 'RENT'
                ? 'has-background-primary'
                : 'has-background-danger'
            "
          >
            {{ props.home.property_type }}
          </div>
          <img :src="props.home.home_img_main" alt="House Image" />
        </figure>
      </div>
    </router-link>

    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-half">
            <router-link
              class="font-bold"
              :to="{
                name: 'home-detail',
                params: { id: props.home.id },
              }"
            >
              <h2>{{ props.home.address.city }}</h2>
            </router-link>
            <h4>{{ props.home.address.street }}</h4>
          </div>
          <div class="column is-half">
            <div class="mb-4 text-center">
              <span class="font-bold text-lg"
                >{{ props.home.total_rent }}€</span
              >
              <span>
                {{ props.home.property_type == "RENT" ? " / mo" : "" }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="props.home.agent.agent_img"
              alt="Agent Image"
              class="rounded-lg"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ props.home.agent.agent_name }}</p>
          <p class="subtitle is-5">{{ props.home.agent.agent_twitter }}</p>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <span class="card-footer-item">
        <inline-svg
          src="./icons/bedroom-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ props.home.specifications.rooms }} Rooms
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="./icons/bathroom-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ props.home.specifications.baths }} Baths
        </span>
      </span>
      <span class="card-footer-item">
        <inline-svg
          src="./icons/space-icon.svg"
          width="25"
          height="25"
          class="mr-2"
        />
        <span class="whitespace-nowrap overflow-hidden">
          {{ props.home.specifications.space }} m<sup>2</sup>
        </span>
      </span>
    </footer>
  </div>

  <div class="card flex flex-row h-[20%]" v-else>
    <img :src="props.home.home_img_main" alt="" class="is-4by3 max-w-[35%]" />
    <div
      class="z-50 text-white font-semibold absolute left-0 top-0 p-1 m-4"
      :class="
        props.home.property_type == 'RENT'
          ? 'has-background-primary'
          : 'has-background-danger'
      "
    >
      {{ props.home.property_type }}
    </div>

    <div class="w-full">
      <router-link
        class="has-text-black text-center"
        :to="{
          name: 'home-detail',
          params: { id: props.home.id },
        }"
      >
        <h2 class="mx-2 mt-2 font-bold text-lg">
          {{ props.home.address.city }}
        </h2>

        <h3 class="mx-2 font-semibold">
          {{ props.home.address.street }}
        </h3>
      </router-link>
      <div class="card-content h-40 overflow-clip">
        {{ props.home.listing_text }}
      </div>

      <div class="mb-4 w-full text-center">
        <span class="font-bold text-lg">{{ props.home.total_rent }}€</span>
        <span>{{ props.home.property_type == "RENT" ? " / mo" : "" }}</span>
      </div>

      <footer class="card-footer">
        <span class="card-footer-item">
          <inline-svg
            src="./icons/bedroom-icon.svg"
            width="20"
            height="20"
            class="mr-2"
          />
          {{ props.home.specifications.rooms }} Rooms
        </span>
        <span class="card-footer-item">
          <inline-svg
            src="./icons/bathroom-icon.svg"
            width="20"
            height="20"
            class="mr-2"
          />
          {{ props.home.specifications.baths }} Baths
        </span>
        <span class="card-footer-item">
          <inline-svg
            src="./icons/space-icon.svg"
            width="20"
            height="20"
            class="mr-2"
          />
          {{ props.home.specifications.space }} m<sup>2</sup>
        </span>
      </footer>
    </div>
  </div>
</template>
