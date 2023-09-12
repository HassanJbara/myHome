<script lang="ts" setup>
import type { Home } from "@/modules";
import { HomeListingCard } from "@/components";

import InlineSvg from "vue-inline-svg";
import { NScrollbar, NResult } from "naive-ui";

interface Props {
  homes: Home[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-row m-6 h-1/4 items-center gap-4">
      <InlineSvg
        src="/icons/heart-solid.svg"
        width="30"
        height="30"
        fill="black"
      />
      <header class="font-bold text-2xl">Wishlist</header>
    </div>

    <n-result
      v-if="homes.length === 0"
      status="info"
      title="Nothing in the wishlist"
      description="You haven't wishlisted any properties yet, maybe check what's on offer again?"
      class="mt-24"
    >
      <template #footer>
        <div class="buttons">
          <router-link
            class="button is-primary font-bold w-full"
            :to="{ name: 'all-homes' }"
          >
            <strong>All Homes</strong>
          </router-link>
        </div>
      </template>
    </n-result>

    <n-scrollbar style="max-height: 60vh">
      <div class="flex flex-wrap">
        <HomeListingCard
          v-for="home in homes"
          :key="home.id"
          :home="home"
          class="m-4 h-fit"
        />
      </div>
    </n-scrollbar>
  </div>
</template>
