import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";

import {
  MainPageView,
  AllHomesView,
  HomeListingView,
  AddPropertyView,
  NotFoundView,
} from "@/views";

import { useHomesStore } from "@/stores";

const routes = [
  { path: "/", component: MainPageView },
  {
    path: "/allhomes",
    name: "all-homes",
    component: AllHomesView,
  },
  {
    path: "/home/:id",
    name: "home-detail",
    component: HomeListingView,
    beforeEnter(to: RouteLocationNormalized) {
      const HomesStore = useHomesStore();
      const destinationHome = HomesStore.getHomeByID(
        parseInt(to.params.id.toString())
      );
      if (!destinationHome) {
        return {
          name: "not-found-home",
          params: { id: to.params.id },
        };
      }
    },
  },
  {
    path: "/add-property",
    name: "add-property",
    component: AddPropertyView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
  {
    path: "/home/:id",
    name: "not-found-home",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0 }), 300);
      })
    );
  },
});

export default router;
