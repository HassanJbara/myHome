<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { NAutoComplete } from "naive-ui";
import _ from "lodash";

import { home_types, property_types } from "@/modules";
import { useHomesStore } from "@/stores";
import { useSearch } from "@/composables";
// import api from "@/api";
import {
  SearchCity,
  SearchFeatures,
  SearchRent,
  SearchSelection,
} from "@/components";

interface Props {
  type?: "vertical" | "horizontal";
}

withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

const mobile = inject<boolean>("isMobile", false);
const homeFeatures = ref<string[] | undefined>(undefined);

const HomesStore = useHomesStore();
const { searchData, setFeatures } = useSearch();

// function getShow(input: string) {
//   if (cityChoice.value) {
//     if (
//       cityOptions.some((cityName) =>
//         cityName.includes(String(cityChoice.value))
//       )
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

// Implement auto complete later.
// const cityOptions = ["leipzig", "berlin"];

// const cityOptionsAuto = computed(() => {
//   if (!cityChoice.value) {
//     return cityOptions;
//   }
//   return cityOptions.filter((city) => {
//     return city.startsWith(String(cityChoice.value));
//   });
// });

// is for now not used in the search
const bedroomChoice = ref(undefined);
const bedroomsOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

// is for now not used in the search
const bathsChoice = ref(undefined);
const bathsOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

async function search() {
  HomesStore.search(searchData.value);
  emit("searched");
}

const emit = defineEmits<{
  (e: "searched"): void;
}>();
</script>

<template>
  <div
    class="content-center flex max-w-[90%] self-center"
    :class="
      type == 'vertical'
        ? 'flex-col w-full m-4'
        : 'flex-row w-2/3 justify-evenly py-2 my-6 overflow-hidden'
    "
  >
    <div
      class="content-center flex text-black"
      :class="
        type == 'vertical'
          ? 'flex-col w-full'
          : 'flex-col w-4/5 justify-between gap-5'
      "
    >
      <div
        class="content-center flex text-black max-w-[90%] rounded-md self-center"
        :class="
          type == 'vertical'
            ? 'flex-col w-full'
            : 'flex-row w-full justify-between'
        "
      >
        <SearchCity v-model:city="searchData.city" :type="type" />

        <SearchFeatures
          v-model:home-features="homeFeatures"
          @input="setFeatures(homeFeatures)"
          :type="type"
        />

        <SearchRent
          v-model:rent="searchData.rent"
          :property-type="searchData.property_type"
          :type="type"
        />
      </div>

      <div
        class="content-center flex text-black max-w-[90%] rounded-md self-center"
        :class="
          type == 'vertical'
            ? 'flex-col w-full'
            : 'flex-row w-full justify-between'
        "
      >
        <SearchSelection
          title="Type"
          :type="type"
          v-model:choice="searchData.home_type"
          :options="
            home_types.map((h_t) => {
              return { value: h_t, label: _.capitalize(h_t) };
            })
          "
        />

        <SearchSelection
          title="Purpose"
          :type="type"
          v-model:choice="searchData.property_type"
          :options="
            property_types.map((p_t) => {
              return { value: p_t, label: _.capitalize(p_t) };
            })
          "
        />

        <SearchSelection
          title="Beds"
          :type="type"
          :options="bedroomsOptions"
          v-model:choice="bedroomChoice"
        />

        <SearchSelection
          title="Baths"
          :type="type"
          :options="bathsOptions"
          v-model:choice="bathsChoice"
        />
      </div>
    </div>

    <router-link
      to="/allhomes"
      class="p-2 bg-[#00d1b2] hover:bg-teal-500 transition-colors ease-in-out delay-200"
      :class="
        type == 'vertical' ? 'rounded-md mx-2 mt-4' : 'rounded-r-md -my-2 w-1/5'
      "
      @click="search"
    >
      <button class="text-center text-2xl font-bold w-full h-full text-white">
        Search
      </button>
    </router-link>
  </div>
</template>
