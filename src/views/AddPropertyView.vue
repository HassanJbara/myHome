<script setup lang="ts">
// Input fields should be made separate components
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import homes from "@/api/modules/homes";

import InlineSvg from "vue-inline-svg";

import { computed, ref } from "vue";
import type { HomesNewProperty } from "@/modules/homes";

const home_types = ["Appartment", "Duplex", "House", "Studio"];
const property_types = ["Rent", "Sale"];

const dataDict = ref<HomesNewProperty>();
dataDict.value = {
  info: {
    home_name: "",
    home_type: home_types[0],
    property_type: property_types[0],
    listing_text: "",
    cold_rent: 0,
    warm_rent: 0,
  },
  address: { city: "", street: "", house_number: 0, plz: "" },
  features: {
    pet_friendly: false,
    balcony: false,
    clubhouse: false,
    dishwasher: false,
    elevator: false,
    spa: false,
    fitness_center: false,
    pool: false,
    modern_kitchen: false,
  },
  specifications: { rooms: 0, baths: 0, space: 0 },
};

const validators = computed(() => ({
  has_name: !!dataDict.value?.info.home_name,
  has_city: !!dataDict.value?.address.city,
  has_street: !!dataDict.value?.address.street,
  has_house_number: !!dataDict.value?.address.house_number,
  has_plz: !!dataDict.value?.address.plz,
  has_rooms: !!dataDict.value?.specifications.rooms,
  has_baths: !!dataDict.value?.specifications.baths,
  has_space: !!dataDict.value?.specifications.space,
  house_number_is_valid:
    parseInt(String(dataDict?.value?.address.house_number)) >= 1,
  plz_is_valid: parseInt(String(dataDict?.value?.address.plz)) >= 10000,
}));

function changeSpecification(specifications: "rooms" | "baths" | "space") {
  const newValue = (document.getElementById(specifications) as HTMLInputElement)
    .value;
  if (dataDict.value) {
    dataDict.value.specifications[specifications] = parseInt(newValue);
  }
}

function changeFeature(feature: string) {
  dataDict.value.features[feature] = !dataDict.value.features[feature];
}

function onSubmit() {
  if (dataDict.value) {
    for (const validator in validators.value) {
      console.log(validator);
      if (!validators.value[validator]) {
        return;
      }
    }
    homes.addProperty(dataDict.value);
  }
}

function capitalizeFirstLetter(label: string) {
  const result = label.charAt(0).toUpperCase() + label.slice(1);
  return result.replace(/_/g, " ");
}
</script>

<template>
  <main>
    <Header :with-search="false" />
    <h1 class="mt-4 font-bold text-3xl w-full text-center">Add New Property</h1>

    <div class="flex flex-row justify-center">
      <form class="flex flex-col w-3/4 mt-8">
        <h2 class="mt-4 font-bold text-lg w-full text-center">
          Basic Information
        </h2>
        <div
          class="field flex flex-row flex-wrap mt-4 w-full items-center justify-center"
        >
          <div class="flex flex-row gap-8 w-full self-center justify-center">
            <div class="flex flex-col w-2/5">
              <label class="label">Listing Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="dataDict.info.home_name"
                  required
                />
              </div>
            </div>
            <div class="flex flex-col w-1/5">
              <label class="label">Property Type</label>
              <div class="select w-full">
                <select class="w-full" v-model="dataDict.info.home_type">
                  <option
                    v-for="(option, index) in home_types"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-col w-1/5">
              <label class="label">Listing Type</label>
              <div class="select">
                <select class="w-full" v-model="dataDict.info.property_type">
                  <option
                    v-for="(option, index) in property_types"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Rent -->
          <div
            class="flex flex-row gap-8 mt-4 w-full self-center justify-center"
          >
            <div class="flex flex-col">
              <label class="label">Cold Rent</label>
              <div class="control has-icons-right">
                <input
                  class="input"
                  type="number"
                  v-model="dataDict.info.cold_rent"
                  placeholder="cold rent"
                  min="100"
                  required
                />
                <span class="icon is-small is-right">
                  <inline-svg
                    src="./icons/euro.svg"
                    fill="#B3E0FF"
                    width="50%"
                    height="50%"
                  />
                </span>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="label">Warm Rent</label>
              <div class="control has-icons-right">
                <input
                  class="input"
                  type="number"
                  v-model="dataDict.info.warm_rent"
                  placeholder="warm rent"
                  min="100"
                />
                <span class="icon is-small is-right">
                  <inline-svg
                    src="./icons/euro.svg"
                    fill="#B3E0FF"
                    width="50%"
                    height="50%"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <h2 class="mt-8 font-bold text-lg w-full text-center">
          Specifications
        </h2>
        <div
          class="field flex flex-row flex-wrap gap-4 mt-4 self-center is-grouped"
        >
          <div
            v-for="(value, label, index) in dataDict?.specifications"
            :key="index"
            class="flex flex-col"
          >
            <label class="label">{{ capitalizeFirstLetter(label) }}</label>
            <div class="control">
              <input
                class="input"
                :id="label"
                type="number"
                min="1"
                :placeholder="label"
                @change="changeSpecification(label)"
                required
              />
            </div>
          </div>
        </div>

        <h2 class="mt-8 font-bold text-lg w-full text-center">Home Features</h2>
        <div class="flex flex-row flex-wrap mt-4 mb-2 w-[80%] self-center">
          <label
            class="checkbox m-8 font-semibold"
            v-for="(value, label, index) in dataDict?.features"
            :key="index"
          >
            <input type="checkbox" @change="changeFeature(label)" />
            {{ capitalizeFirstLetter(label) }}
          </label>
        </div>

        <h2 class="mt-8 font-bold text-lg w-full text-center">Home Address</h2>

        <!-- city -->
        <div class="field flex flex-col w-[80%] self-center">
          <label class="label"> City </label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="dataDict.address.city"
              placeholder="city"
            />
          </div>
        </div>

        <!-- Street -->
        <div class="field flex flex-col w-[80%] self-center">
          <label class="label"> Street </label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="dataDict.address.street"
              placeholder="street"
            />
          </div>
        </div>

        <!-- House Number -->
        <div class="field flex flex-col w-[80%] self-center">
          <label class="label"> House Number </label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="dataDict.address.house_number"
              placeholder="house number"
            />
          </div>
        </div>

        <!-- PLZ -->
        <div class="field flex flex-col w-[80%] self-center">
          <label class="label"> PLZ </label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="dataDict.address.plz"
              placeholder="plz"
              min="10000"
              max="99999"
            />
          </div>
        </div>

        <!-- Listing Text  -->
        <div class="flex flex-col mt-4 mb-2 gap-2 w-[80%] self-center">
          <label>Property Description</label>
          <textarea
            class="textarea"
            placeholder="Field is Optional"
            v-model="dataDict.info.listing_text"
          />
        </div>
        <div class="control w-[80%] self-center mt-8">
          <button class="button is-link w-full font-semibold" @click="onSubmit">
            Submit
          </button>
        </div>
      </form>
    </div>

    <Footer />
  </main>
</template>
