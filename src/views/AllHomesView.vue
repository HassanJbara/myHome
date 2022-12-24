<script setup lang="ts">
import {
  Search,
  HomeListingCard,
  Header,
  Footer,
  HomesMap,
} from "@/components";
import { useHomesStore } from "@/stores";
import { useNavigation } from "@/composables";

import { NSwitch, NSpace, useMessage } from "naive-ui";
import { onMounted, computed, ref, onUnmounted } from "vue";

const HomesStore = useHomesStore();
const message = useMessage();

const afterSearch = ref(false);
const showMap = ref(true);

const homeListings = computed(() => {
  if (HomesStore.getSearchedHomes.length === 0 && afterSearch.value)
    message.error("No Properties Found");
  return HomesStore.getSearchedHomes;
});

const { cP, pagesCount, entriesToDisplay, pagesToDisplay, setCurrentPage } =
  useNavigation(homeListings, 4, 1);

const mapMarkers = computed(() => {
  return homeListings.value
    .filter((h) => h.address.latitude !== 0 || h.address.longitude !== 0)
    .map((h) => {
      return {
        id: h.id,
        cover: h.home_img_main,
        position: { lat: h.address.latitude, lng: h.address.longitude },
        price: h.rent,
      };
    });
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

const isMobile = computed(() => {
  if ("maxTouchPoints" in navigator) {
    return navigator.maxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.("(pointer:coarse)");
    if (mQ?.media === "(pointer:coarse)") {
      return !!mQ.matches;
    } else if ("orientation" in window) {
      return true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent;
      return (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }
});

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
    <Header :with-search="false" :mobile="isMobile" />
    <div class="columns">
      <div class="column is-one-quarter">
        <div
          class="box flex-col items-center justify-center sticky top-0"
          style="border-radius: 0px 0px 12px 0px"
        >
          <n-space justify="center">
            List
            <n-switch
              v-model:value="showMap"
              :round="false"
              :theme-overrides="{ railColorActive: '#3e8ed0' }"
            />
            Map
          </n-space>
          <Search
            class="overflow-x-auto w-full rounded-md bg-white"
            type="vertical"
            @searched="onSearch"
            :mobile="isMobile"
          />
        </div>
      </div>
      <div class="column h-full overflow-y-auto is-half m-4" v-show="!showMap">
        <h2 class="text-2xl font-semibold">{{ headerText }}</h2>
        <HomeListingCard
          v-for="index in entriesToDisplay"
          :key="index"
          :home="homeListings[index]"
          type="wide"
          class="my-4"
          :mobile="isMobile"
          :show-agent="false"
        />
      </div>
      <div v-if="showMap" class="column is-three-quarters h-1/2">
        <HomesMap map-height="36rem" :home-markers="mapMarkers" />
      </div>
      <div v-else class="column is-one-fifth" />
    </div>
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
    <Footer />
  </main>
</template>
