import { createApp, computed } from "vue";
import { createPinia } from "pinia";
import VueEasyLightbox from "vue-easy-lightbox";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "@/router/index";

const app = createApp(App);

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
      return false;
    }
  }
});

const mapsKey = "AIzaSyCN6tP3i10XQ2uBISjbG8kqSI-H-w54TVo";

app.use(VueEasyLightbox);
app.use(createPinia());
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: mapsKey,
  },
});
app.provide("isMobile", isMobile.value);
app.provide("mapsKey", mapsKey);

app.mount("#app");
