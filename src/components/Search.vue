<script setup lang="ts">
import { ref, computed } from "vue";
import _ from "lodash";
import {
  NSelect,
  NSpace,
  NInput,
  NAutoComplete,
  NCollapse,
  NCollapseItem,
  NCheckbox,
  NCheckboxGroup,
  NSlider,
} from "naive-ui";
import { useHomesStore } from "@/stores/HomesStore";
// import api from "@/api";
// import type { Home } from "@/modules/homes";

interface Props {
  type?: "vertical" | "horizontal";
  mobile: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "horizontal",
});

const HomesStore = useHomesStore();

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

const cityChoice = ref(null);

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

const propertyTypeChoice = ref(null);
const propertyTypeOprions = [
  { value: "APPARTMENT", label: "Appartment" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "HOUSE", label: "House" },
  { value: "STUDIO", label: "Studio" },
];

const purposeChoice = ref(null);
const purposeOptions = [
  { value: "RENT", label: "Rent" },
  { value: "SALE", label: "Sale" },
];

const bedroomChoice = ref(null);
const bedroomsOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const bathsChoice = ref(null);
const bathsOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const homeFeatures = ref<string[] | null>(null);
const homeFeaturesStrings = [
  "pet_friendly",
  "balcony",
  "clubhouse",
  "dishwasher",
  "elevator",
  "spa",
  "fitness_center",
  "pool",
  "modern_kitchen",
];

const rent = ref(100);

async function search() {
  HomesStore.search({
    city: cityChoice.value,
    home_type: propertyTypeChoice.value,
    property_type: purposeChoice.value,
    rooms: bedroomChoice.value,
    features: homeFeatures.value?.join(","),
    rent: purposeChoice.value ? rent.value : null, //Rent should be reset if necessary, thus null
  });
  emit("searched");
}

const emit = defineEmits<{
  (e: "searched"): void;
}>();

function formatTooltip(value: number) {
  return value.toLocaleString() + "€";
}
</script>

<template>
  <div
    class="content-center flex max-w-[90%] self-center"
    :class="
      props.type == 'vertical'
        ? 'flex-col w-full m-4'
        : 'flex-row w-2/3 justify-evenly py-2 my-6 overflow-hidden'
    "
  >
    <div
      class="content-center flex text-black"
      :class="
        props.type == 'vertical'
          ? 'flex-col w-full'
          : 'flex-col w-4/5 justify-between gap-5'
      "
    >
      <div
        class="content-center flex text-black bg-white max-w-[90%] rounded-md self-center"
        :class="
          props.type == 'vertical'
            ? 'flex-col w-full'
            : 'flex-row w-full justify-between'
        "
      >
        <n-space
          vertical
          size="medium"
          :class="props.type == 'vertical' ? '' : 'w-1/3'"
        >
          <span class="font-semibold self-center">City:</span>
          <n-input
            v-model:value="cityChoice"
            type="text"
            placeholder="City"
            clearable
          />
        </n-space>

        <n-collapse
          v-show="props.type == 'vertical'"
          arrow-placement="right"
          class="mt-2"
        >
          <n-collapse-item title="Features" name="1">
            <n-checkbox-group v-model:value="homeFeatures">
              <n-space
                item-style="display: flex; justify-content: space-between;"
              >
                <n-checkbox
                  v-for="feature in homeFeaturesStrings"
                  :key="feature"
                  :value="feature"
                  :label="_.startCase(feature)"
                />
              </n-space>
            </n-checkbox-group>
          </n-collapse-item>
        </n-collapse>

        <n-space
          v-show="purposeChoice || props.type == 'horizontal'"
          vertical
          :class="props.type == 'vertical' ? 'mt-6' : 'w-1/3'"
        >
          <span class="font-semibold self-center">
            {{ purposeChoice == "RENT" ? "Rent" : "Price" }}
          </span>
          <n-slider
            v-model:value="rent"
            :step="purposeChoice == 'RENT' ? 5 : 1000"
            :max="purposeChoice == 'RENT' ? 2000 : 10000000"
            :min="purposeChoice == 'RENT' ? 100 : 100000"
            :format-tooltip="formatTooltip"
          />
        </n-space>
      </div>

      <div
        class="content-center flex text-black bg-white max-w-[90%] rounded-md self-center"
        :class="
          props.type == 'vertical'
            ? 'flex-col w-full'
            : 'flex-row w-full justify-between'
        "
      >
        <n-space
          vertical
          size="medium"
          :class="props.type == 'vertical' ? 'mt-4' : 'w-1/5'"
        >
          <span class="font-semibold self-center">Type:</span>
          <n-select
            v-model:value="propertyTypeChoice"
            :options="propertyTypeOprions"
            clearable
          />
        </n-space>

        <n-space
          vertical
          size="medium"
          :class="props.type == 'vertical' ? 'mt-4' : 'w-1/5'"
        >
          <span class="font-semibold self-center">Purpose:</span>
          <n-select
            v-model:value="purposeChoice"
            :options="purposeOptions"
            clearable
          />
        </n-space>

        <n-space
          vertical
          size="medium"
          :class="props.type == 'vertical' ? 'mt-4' : 'w-1/5'"
        >
          <span class="font-semibold self-center">Beds:</span>
          <n-select
            v-model:value="bedroomChoice"
            :options="bedroomsOptions"
            clearable
          />
        </n-space>

        <n-space
          vertical
          size="medium"
          :class="props.type == 'vertical' ? 'mt-4' : 'w-1/5'"
        >
          <span class="font-semibold self-center">Baths:</span>
          <n-select
            v-model:value="bathsChoice"
            :options="bathsOptions"
            clearable
          />
        </n-space>
      </div>
    </div>

    <router-link
      to="/allhomes"
      class="p-2 bg-[#00d1b2] hover:bg-teal-500 transition-colors ease-in-out delay-200"
      :class="
        props.type == 'vertical'
          ? 'rounded-md mx-2 mt-4'
          : 'rounded-r-md -my-2 w-1/5'
      "
      @click="search"
    >
      <button class="text-center text-2xl font-bold w-full h-full text-white">
        Search
      </button>
    </router-link>
  </div>
</template>
