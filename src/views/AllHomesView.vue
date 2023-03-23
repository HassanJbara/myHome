<script setup lang="ts">
import {
  SiteSearch,
  HomeListingCard,
  SiteHeader,
  SiteFooter,
  HomesMap,
} from "@/components";
import { useHomesStore } from "@/stores";
import { useNavigation } from "@/composables";

import { NSwitch, NSpace, useMessage } from "naive-ui";
import type { MessageReactive } from "naive-ui";
import { onMounted, computed, ref, onUnmounted } from "vue";

const HomesStore = useHomesStore();
const message = useMessage();

const afterSearch = ref(false);
const showMap = ref(true);
const msgReactive = ref<MessageReactive | null>(null);

const homeListings = computed(() => {
  handleMessage();
  return HomesStore.getSearchedHomes;
});

function handleMessage() {
  if (HomesStore.getSearchedHomes.length === 0 && afterSearch.value)
    if (msgReactive.value) {
      msgReactive.value.type = "error";
      msgReactive.value.content = "Search done, no results found!";
    }
}

const { cP, pagesCount, entriesToDisplay, pagesToDisplay, setCurrentPage } =
  useNavigation(homeListings, 4, 1);

const mapMarkers = computed(() => {
  return homeListings.value
    .filter((h) => h.address.position)
    .filter(
      (h) => h.address.position.lat !== 0 || h.address.position.lng !== 0
    );
});

const headerText = computed(() => {
  if (HomesStore.getSearchedHomes.length == HomesStore.getHomes.length) {
    return "Showing All Homes";
  } else {
    return "Showing Search Results";
  }
});

function onSearch() {
  // headerText.value = "Showing Search Results";
  setCurrentPage(1);
  msgReactive.value = message.create("Search done", { type: "info" });
  afterSearch.value = true;
}

// Nav buttons.
function navPage(pageNumber: number) {
  setCurrentPage(pageNumber);
}

function prevPage() {
  if (!(cP.value == 1)) {
    setCurrentPage(cP.value - 1);
  }
}

function nextPage() {
  if (!(cP.value == pagesCount.value.length)) {
    setCurrentPage(cP.value + 1);
  }
}

onMounted(() => {
  const searchedHomes = HomesStore.getSearchedHomes;
  // const allHomes = HomesStore.getHomes;

  if (searchedHomes.length == 0) {
    HomesStore.search();
  }
});

onUnmounted(() => {
  HomesStore.clearSearch();
});
</script>

<template>
  <main>
    <SiteHeader :with-search="false" />

    <div class="columns">
      <div class="column is-one-quarter">
        <div
          class="box flex-col items-center justify-center sticky top-0"
          style="border-radius: 0px 0px 12px 0px"
        >
          <n-space justify="center" align="center">
            <span class="font-medium">List</span>
            <n-switch
              v-model:value="showMap"
              :round="false"
              :theme-overrides="{ railColorActive: '#3e8ed0' }"
            />
            <span class="font-medium">Map</span>
          </n-space>
          <SiteSearch
            class="overflow-x-auto w-full rounded-md bg-white"
            type="vertical"
            @searched="onSearch"
          />
        </div>
      </div>

      <Transition
        mode="out-in"
        enter-active-class="duration-300 ease-out transition-all"
        enter-from-class="translate-y-7 opacity-0"
        leave-active-class="duration-300 ease-out transition-all"
        leave-to-class="-translate-y-7 opacity-0"
      >
        <div v-if="showMap" class="column is-three-quarters h-1/2">
          <HomesMap map-height="46rem" :home-markers="mapMarkers" />
        </div>

        <div v-else class="column h-full overflow-y-auto is-half m-4">
          <h2 class="text-2xl font-semibold">{{ headerText }}</h2>
          <HomeListingCard
            v-for="index in entriesToDisplay"
            :key="index"
            :home="homeListings[index]"
            type="wide"
            class="my-4"
            :show-agent="false"
          />
        </div>
      </Transition>

      <div v-show="!showMap" class="column is-one-fifth" />
    </div>

    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div class="flex flex-row justify-center" v-show="!showMap">
        <nav
          class="pagination is-centered w-[80%]"
          role="navigation"
          aria-label="pagination"
        >
          <a
            class="pagination-previous"
            :class="{ 'is-disabled': cP == 1 }"
            @click="prevPage"
          >
            Previous
          </a>
          <a
            class="pagination-next"
            @click="nextPage"
            :class="{
              'is-disabled': cP == pagesCount.length,
            }"
          >
            Next page
          </a>
          <ul class="pagination-list">
            <li v-for="pageNumber in pagesToDisplay" :key="pageNumber">
              <a
                v-if="!(pageNumber < 0)"
                class="pagination-link"
                :class="{ 'is-current': cP == pageNumber }"
                @click="navPage(pageNumber)"
              >
                {{ pageNumber }}
              </a>
              <span v-else class="pagination-ellipsis">&hellip;</span>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>

    <SiteFooter />
  </main>
</template>
