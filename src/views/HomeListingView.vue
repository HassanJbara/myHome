<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AgentCard from "@/components/AgentCard.vue";
import { useHomesStore } from "@/stores/HomesStore";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import _ from "lodash";

import VueEasyLightbox from "vue-easy-lightbox";
import InlineSvg from "vue-inline-svg";

const router = useRouter();
const HomesStore = useHomesStore();

const key = "AIzaSyCN6tP3i10XQ2uBISjbG8kqSI-H-w54TVo";

const param_id = String(router.currentRoute.value.params.id);
const this_home = computed(() => HomesStore.getHomeByID(parseInt(param_id)));

function features_halfs(half: "first" | "second") {
  if (this_home.value) {
    if (!this_home.value.features) return [];
    const features_keys = Object.keys(this_home.value.features);
    console.log(features_keys);
    const half_length = Math.ceil(features_keys.length / 2);
    if (half == "first") {
      return features_keys.splice(0, half_length);
    } else {
      return features_keys.splice(half_length, features_keys.length);
    }
  } else {
    return [];
  }
}
// Gallery Stuff
const visibleRef = ref(false);
const indexRef = ref(0);

const gallery = computed(() => {
  if (this_home.value && this_home.value?.gallery_images.length > 0) {
    return this_home.value.gallery_images;
  } else {
    return [
      "https://bulma.io/images/placeholders/256x256.png",
      "https://bulma.io/images/placeholders/256x256.png",
      "https://bulma.io/images/placeholders/256x256.png",
      "https://bulma.io/images/placeholders/256x256.png",
      "https://bulma.io/images/placeholders/256x256.png",
      "https://bulma.io/images/placeholders/256x256.png",
    ];
  }
});

function checkFeature(feature: string) {
  if (
    feature == "pet_friendly" ||
    feature == "balcony" ||
    feature == "clubhouse" ||
    feature == "dishwasher" ||
    feature == "elevator" ||
    feature == "spa" ||
    feature == "fitness_center" ||
    feature == "pool" ||
    feature == "modern_kitchen"
  )
    return this_home.value?.features[feature];
}

const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => (visibleRef.value = false);

onBeforeMount(() => {
  HomesStore.fill();
});
</script>

<template>
  <main>
    <Header :with-search="false" />
    <section class="hero is-large">
      <div
        class="bg-cover bg-center w-full hero-body"
        :style="{ backgroundImage: 'url(' + this_home?.home_img_main + ')' }"
      ></div>
    </section>

    <nav class="level mt-10">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ this_home?.property_type }}</p>
          <p class="title">{{ this_home?.rent }}$</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Bedrooms</p>
          <p class="title">{{ this_home?.specifications.rooms }} Bedrooms</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Bathrooms</p>
          <p class="title">{{ this_home?.specifications.baths }} Bathrooms</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Space</p>
          <p class="title">{{ this_home?.specifications.space }} sq</p>
        </div>
      </div>
      <div class="level-item has-text-centered m-4">
        <button class="button is-info is-large is-responsive">
          Request a Showing
        </button>
      </div>
    </nav>

    <hr class="my-10" />

    <div class="columns has-text-centered">
      <div class="column is-two-thirds">
        <div class="columns">
          <div
            class="flex flex-col column is-two-thirds is-offset-1 has-text-left"
          >
            <div class="text-3xl font-bold mb-2">
              {{ this_home?.address.city }}
            </div>
            <div class="text-lg font-semibold mt-2 -mb-2">
              {{ this_home?.address.street }}, {{ this_home?.address.plz }}
            </div>
          </div>
          <div class="column is-one-thirds is-offset-1">
            <span
              class="text-white font-semibold p-1 rounded-sm w-1/2 block"
              :class="
                this_home?.property_type == 'RENT'
                  ? 'has-background-primary'
                  : 'has-background-danger'
              "
            >
              {{ this_home?.property_type }}
            </span>
          </div>
        </div>
        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl">Specification</div>
          <div class="column">
            <div>Bedrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bedrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bedrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bedrooms: {{ this_home?.specifications.rooms }}</div>
          </div>
          <div class="column">
            <div>Bathrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bathrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bathrooms: {{ this_home?.specifications.rooms }}</div>
            <div>Bathrooms: {{ this_home?.specifications.rooms }}</div>
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl">Leasing Terms</div>
          <div class="column">
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
          </div>
          <div class="column">
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl">Leasing Terms</div>
          <div class="column">
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
          </div>
          <div class="column">
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl">Leasing Terms</div>
          <div class="column">
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
            <div>Deposit: {{ this_home?.specifications.rooms }}</div>
          </div>
          <div class="column">
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
            <div>Allowed Pets: {{ this_home?.specifications.rooms }}</div>
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl">Features</div>
          <div class="column">
            <div
              v-for="(feature_text, index) in features_halfs('first')"
              :key="index"
              class="flex flex-row gap-2 mb-4"
            >
              <inline-svg
                :src="
                  checkFeature(feature_text)
                    ? './icons/checked-tick.svg'
                    : './icons/checked-cross.svg'
                "
                width="20px"
                height="20px"
                class="self-center"
                :fill="checkFeature(feature_text) ? '#23D160' : '#FF3860'"
              />
              {{ _.startCase(feature_text) }}
            </div>
          </div>
          <div class="column">
            <div
              v-for="(feature_text, index) in features_halfs('second')"
              :key="index"
              class="flex flex-row gap-2 mb-4"
            >
              <inline-svg
                :src="
                  checkFeature(feature_text)
                    ? './icons/checked-tick.svg'
                    : './icons/checked-cross.svg'
                "
                width="20px"
                height="20px"
                class="self-center"
                :fill="checkFeature(feature_text) ? '#23D160' : '#FF3860'"
              />
              {{ _.startCase(feature_text) }}
            </div>
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column flex flex-col mx-6">
            <div class="flex flex-row gap-2 mb-2">
              <div
                v-for="index in Array(3).keys()"
                :key="index"
                class="pic"
                @click="() => showImg(index)"
              >
                <img :src="gallery[index]" class="cursor-pointer rounded-md" />
              </div>
            </div>
            <div class="flex flex-row gap-2 mt-1">
              <div
                v-for="index in Array(3).keys()"
                :key="index"
                class="pic"
                @click="() => showImg(index + 3)"
              >
                <img
                  :src="gallery[index + 3]"
                  class="cursor-pointer rounded-md"
                />
              </div>
            </div>
            <vue-easy-lightbox
              :visible="visibleRef"
              :imgs="gallery"
              :index="indexRef"
              @hide="onHide"
              :move-disabled="true"
            />
          </div>
        </div>

        <hr class="my-10" />

        <div class="columns has-text-centered">
          <div class="column font-semibold text-xl is-one-third">Address</div>
          <div
            class="column is-two-thirds flex flex-row items-center justify-center"
          >
            <iframe
              width="90%"
              height="400"
              style="border: 0"
              class="rounded-xl"
              loading="lazy"
              allowfullscreen
              :src="
                'https://www.google.com/maps/embed/v1/place?key=' +
                key +
                '&q=' +
                this_home?.address.street +
                this_home?.address.house_number +
                ', ' +
                this_home?.address.plz +
                this_home?.address.city
              "
            />
          </div>
        </div>
      </div>

      <div class="column is-one-third">
        <AgentCard
          class="max-h-[25%] sticky top-10"
          :agent="this_home?.agent"
        />
      </div>
    </div>

    <Footer />
  </main>
</template>
