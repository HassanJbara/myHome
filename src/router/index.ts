import { createRouter, createWebHashHistory } from "vue-router";

import MainPageView from "@/views/MainPageView.vue";

const routes = [
  { path: "/", component: MainPageView },
  {
    path: "/allhomes",
    name: "all-homes",
    component: () => import("@/views/AllHomesView.vue"),
  },
  {
    path: "/home/:id",
    name: "home-detail",
    component: () => import("@/views/HomeListingView.vue"),
  },
  {
    path: "/add-property",
    name: "add-property",
    component: () => import("@/views/AddPropertyView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
