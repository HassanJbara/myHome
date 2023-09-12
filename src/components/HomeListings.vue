<script setup lang="ts">
import { HomeListingCard } from "@/components";
import { useHomesStore } from "@/stores";

import { onMounted, computed } from "vue";

const HomesStore = useHomesStore();

const homeListings = computed(() => {
  const number_of_homes = HomesStore.getHomes.length;
  return HomesStore.getHomes.slice(number_of_homes - 6, number_of_homes); // Only last 6
});

function homes_halfs(half: "first" | "second") {
  const result = homeListings.value.slice();
  const half_length = Math.ceil(result.length / 2);
  if (half == "first") {
    if (result.length < 4) {
      return result;
    } else {
      return result.splice(0, half_length);
    }
  } else {
    if (result.length < 4) {
      return;
    } else {
      return result.splice(half_length, result.length);
    }
  }
}

onMounted(() => {
  HomesStore.fill();
});
</script>

<template>
  <div class="grow mt-10 flex flex-row justify-center">
    <div class="flex flex-col justify-center items-center w-11/12">
      <div class="flex flex-row m-4 justify-between w-full">
        <h2 class="text-center text-2xl font-semibold">Find Your Property</h2>

        <router-link to="/allhomes" class="navbar-item">
          <button class="self-center font-semibold hover:text-blue-400">
            Find more ➜
          </button>
        </router-link>
      </div>
      <div class="flex flex-row justify-between overflow-x-auto w-full">
        <!-- THESE SHOULD FLEX COL ON MOBILE! !-->

        <HomeListingCard
          v-for="(listing, index) in homes_halfs('first')"
          :key="index"
          :home="listing"
          class="m-2 w-4/12"
        />
      </div>

      <div class="flex flex-row overflow-x-auto w-full justify-between">
        <!-- THESE SHOULD FLEX COL ON MOBILE! !-->

        <HomeListingCard
          v-for="(listing, index) in homes_halfs('second')"
          :key="index"
          :home="listing"
          class="m-2 w-4/12"
        />
      </div>
    </div>
  </div>
</template>
