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
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent;
      return (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }
});

app.use(VueEasyLightbox);
app.use(createPinia());
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCN6tP3i10XQ2uBISjbG8kqSI-H-w54TVo",
  },
});
app.provide("isMobile", isMobile.value);

app.mount("#app");
