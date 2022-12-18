<script setup lang="ts">
// Input fields should be made separate components
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import homes from "@/api/modules/homes";
import { useAuthStore } from "@/stores/AuthStore";
import { useMessage } from "naive-ui";
import _ from "lodash";

import InlineSvg from "vue-inline-svg";

import { computed, onMounted, ref } from "vue";
import type { HomesNewProperty } from "@/modules/homes";
import * as homesTypes from "@/modules/homes";

const authStore = useAuthStore();
const message = useMessage();

const token = ref<string>();

const initialHome: HomesNewProperty = {
  info: {
    home_name: "",
    home_type: "",
    rent: 0,
    property_type: "",
    listing_text: "",
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
const dataDict = ref<HomesNewProperty>(initialHome);

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
  house_rent_is_valid: parseInt(String(dataDict?.value?.info.rent)) >= 100,
  plz_is_valid: parseInt(String(dataDict?.value?.address.plz)) >= 10000,
}));

function changeSpecification(specifications: "rooms" | "baths" | "space") {
  const newValue = (document.getElementById(specifications) as HTMLInputElement)
    .value;
  dataDict.value.specifications[specifications] = parseInt(newValue);
}

function changeFeature(
  feature:
    | "pet_friendly"
    | "balcony"
    | "clubhouse"
    | "dishwasher"
    | "elevator"
    | "spa"
    | "fitness_center"
    | "pool"
    | "modern_kitchen"
) {
  dataDict.value.features[feature] = !dataDict.value.features[feature];
}

function onSubmit() {
  for (const validator in validators.value) {
    if (
      validator == "has_name" ||
      validator == "has_city" ||
      validator == "has_street" ||
      validator == "has_house_number" ||
      validator == "has_plz" ||
      validator == "has_rooms" ||
      validator == "has_baths" ||
      validator == "has_space" ||
      validator == "house_number_is_valid" ||
      validator == "house_rent_is_valid" ||
      validator == "plz_is_valid"
    )
      if (!validators.value[validator]) {
        return;
      }
  }
  if (token.value) {
    homes.addProperty(dataDict.value, token.value).then(
      () => {
        clearFields();
        message.success("Success. Property submitted for reviewing.");
      },
      (errorData) => {
        message.error(errorData.response.data.error);
      }
    );
  } else {
    console.error("Token is not set");
    fetchToken();
    if (token.value) {
      homes.addProperty(dataDict.value, token.value).then(
        () => {
          clearFields();
          message.success("Success. Property submitted for reviewing.");
        },
        (errorData) => {
          message.error(errorData.response.data.error);
        }
      );
    }
  }
}

function fetchToken() {
  const user = authStore.getUser;
  if (!user) {
    authStore.LOGIN({ username: "admin", password: "root" });
  }
  token.value = authStore.getToken;
}

function clearFields() {
  dataDict.value = {
    info: {
      home_name: "",
      home_type: homesTypes.home_types[0],
      property_type: homesTypes.property_types[0],
      listing_text: "",
      rent: 0,
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

  (document.getElementById("rooms") as HTMLInputElement).value = "";
  (document.getElementById("space") as HTMLInputElement).value = "";
  (document.getElementById("baths") as HTMLInputElement).value = "";
}

onMounted(() => {
  fetchToken();
  clearFields();
});
</script>

<template>
  <main>
    <Header :with-search="false" :mobile="false" />
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
                    v-for="(option, index) in homesTypes.home_types"
                    :key="index"
                    :value="option"
                  >
                    {{ _.capitalize(option) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-col w-1/5">
              <label class="label">Listing Type</label>
              <div class="select">
                <select class="w-full" v-model="dataDict.info.property_type">
                  <option
                    v-for="(option, index) in homesTypes.property_types"
                    :key="index"
                    :value="option"
                  >
                    {{ _.capitalize(option) }}
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
              <label class="label">Rent</label>
              <div class="control has-icons-right">
                <input
                  class="input"
                  type="number"
                  v-model="dataDict.info.rent"
                  placeholder="rent "
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
            <label class="label">{{ _.capitalize(label) }}</label>
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
            {{ _.startCase(label) }}
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
              required
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
              required
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
              required
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
              required
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
