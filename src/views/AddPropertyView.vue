<script setup lang="ts">
// Input fields should be made separate components
import {
  SiteHeader,
  SiteFooter,
  AddPropertyBasicInfo,
  AddPropertySpecifications,
  AddPropertyFeatures,
  AddPropertyAddress,
} from "@/components";
import { useAddProperty } from "@/composables";
import { useAuthStore } from "@/stores";
import api from "@/api";

import { onMounted, ref } from "vue";
import { useMessage } from "naive-ui";

const authStore = useAuthStore();
const message = useMessage();

const token = ref<string>();

const { clearFields, dataDict, validators } = useAddProperty();

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
    api.homes.addProperty(dataDict.value, token.value).then(
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
      api.homes.addProperty(dataDict.value, token.value).then(
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

onMounted(() => {
  fetchToken();
  clearFields();
});
</script>

<template>
  <main>
    <SiteHeader :with-search="false" />
    <h1 class="mt-4 font-bold text-3xl w-full text-center">Add New Property</h1>

    <div class="flex flex-row justify-center">
      <form class="flex flex-col w-3/4 mt-8">
        <h2 class="mt-4 font-bold text-lg w-full text-center">
          Basic Information
        </h2>
        <AddPropertyBasicInfo v-model="dataDict.info" />

        <h2 class="mt-8 font-bold text-lg w-full text-center">
          Specifications
        </h2>
        <AddPropertySpecifications v-model="dataDict.specifications" />

        <h2 class="mt-8 font-bold text-lg w-full text-center">Home Features</h2>
        <AddPropertyFeatures v-model="dataDict.features" />

        <h2 class="mt-8 font-bold text-lg w-full text-center">Home Address</h2>
        <AddPropertyAddress v-model="dataDict.address" />

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

    <SiteFooter />
  </main>
</template>
