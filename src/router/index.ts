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
  OwnAccountView,
} from "@/views";

import { useAuthStore, useHomesStore } from "@/stores";

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
    path: "/own-account",
    name: "own-account",
    component: OwnAccountView,
    beforeEnter() {
      // This needs improving!

      const authStore = useAuthStore();
      if (!authStore.getUser) {
        return {
          path: "/",
        };
      }
    },
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
