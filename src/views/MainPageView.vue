<script setup lang="ts">
import {
  SiteHeader,
  SiteFooter,
  HomeListings,
  AgentListings,
} from "@/components";

import router from "@/router/index";
import { useLoadingBar } from "naive-ui";

const loadingBar = useLoadingBar();

router.beforeEach((to, from) => {
  loadingBar.start();
});

router.afterEach((to, from) => {
  loadingBar.finish();
});
</script>

<template>
  <div class="flex flex-col">
    <SiteHeader />
    <HomeListings />
    <AgentListings />
    <SiteFooter />
  </div>
</template>
