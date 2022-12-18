import { createApp } from "vue";
import { createPinia } from "pinia";
import VueEasyLightbox from "vue-easy-lightbox";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "@/router/index";

const app = createApp(App);

app.use(VueEasyLightbox);
app.use(createPinia());
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCN6tP3i10XQ2uBISjbG8kqSI-H-w54TVo",
  },
});

app.mount("#app");
