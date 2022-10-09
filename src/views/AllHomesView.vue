<script setup lang="ts">
import HomeListingCard from "@/components/HomeListingCard.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Search from "@/components/Search.vue";
import { useHomesStore } from "@/stores/HomesStore";

import { onMounted, computed, ref, onUnmounted } from "vue";

const HomesStore = useHomesStore();

const homeListings = computed(() => {
  return HomesStore.getSearchedHomes;
});

const headerText = computed(() => {
  if (HomesStore.getSearchedHomes.length == HomesStore.getHomes.length) {
    return "Showing All Homes";
  } else {
    return "Showing Search Results";
  }
});

// Pagenation
const numberOfEntriesInPage = ref(3);
const currentPage = ref(1);

// Determine how many pages needed in total, from 1 to n. n = ceil(number of homes / number of homes in each page)
const pagesCount = computed(() => {
  if (!homeListings.value) {
    return [];
  } else {
    return Array.from(
      {
        length: Math.ceil(
          homeListings.value.length / numberOfEntriesInPage.value
        ),
      },
      (_, i) => i + 1
    );
  }
});

// Which pages should actually be displayed? Is determined by displayPageNumber method. Also add ellipsis in place of truncated pages.
const pagesToDisplay = computed(() => {
  const arr = pagesCount.value.filter((i) => displayPageNumber(i));
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      continue;
    }
    // -1 is truncation mark for ellipsis
    if (arr[i] > arr[i - 1] + 1) {
      arr.splice(i, 0, -1);
      i++;
    }
  }
  return arr;
});

// Which entries show in which page? Thoe are the entries that will be displayed, i.e. the end result of the pagenation.
const entriesToDisplay = computed(() => {
  if (homeListings.value === undefined) {
    return [];
  } else {
    const arr = Array.from(
      { length: numberOfEntriesInPage.value },
      (_, i) => i + (currentPage.value - 1) * numberOfEntriesInPage.value
    );
    return arr.filter((i) => i < homeListings.value.length);
  }
});

// Should pageNumber n be displayed or omitted?
function displayPageNumber(pageNumber: number) {
  if (pageNumber == pagesCount.value.length || pageNumber == 1) {
    return true;
  } else if (pageNumber > currentPage.value + 1) {
    return false;
  } else if (pageNumber < currentPage.value - 1) {
    return false;
  } else {
    return true;
  }
}

function onSearch() {
  // headerText.value = "Showing Search Results";
  currentPage.value = 1;
}

// Nav buttons.
function navPage(pageNumber: number) {
  currentPage.value = pageNumber;
}

function prevPage() {
  if (!(currentPage.value == 1)) {
    currentPage.value = currentPage.value - 1;
  }
}

function nextPage() {
  if (!(currentPage.value == pagesCount.value.length)) {
    currentPage.value = currentPage.value + 1;
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
    <Header :with-search="false" />
    <div class="columns mt-4">
      <div class="column is-one-quarter is-offset-1">
        <div class="box m-4">
          <Search
            class="overflow-x-auto w-full"
            type="vertical"
            @searched="onSearch"
          />
        </div>
      </div>
      <div class="column is-half m-4 h-full overflow-y-auto">
        <h2 class="text-2xl font-semibold">{{ headerText }}</h2>
        <HomeListingCard
          v-for="index in entriesToDisplay"
          :key="index"
          :home="homeListings[index]"
          type="wide"
          class="my-4"
        />
      </div>
      <div class="column is-one-fifth"></div>
    </div>
    <div class="flex flex-row justify-center">
      <nav
        class="pagination is-centered w-[80%]"
        role="navigation"
        aria-label="pagination"
      >
        <a
          class="pagination-previous"
          :class="{ 'is-disabled': currentPage == 1 }"
          @click="prevPage"
        >
          Previous
        </a>
        <a
          class="pagination-next"
          @click="nextPage"
          :class="{ 'is-disabled': currentPage == pagesCount.length }"
        >
          Next page
        </a>
        <ul class="pagination-list">
          <li v-for="pageNumber in pagesToDisplay" :key="pageNumber">
            <a
              v-if="!(pageNumber < 0)"
              class="pagination-link"
              :class="{ 'is-current': currentPage == pageNumber }"
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

<style></style>
