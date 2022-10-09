import { createApp } from "vue";
import { createPinia } from "pinia";
import VueEasyLightbox from "vue-easy-lightbox";

import App from "./App.vue";
import router from "@/router/index";

const app = createApp(App);

app.use(VueEasyLightbox);
app.use(createPinia());
app.use(router);

app.mount("#app");
