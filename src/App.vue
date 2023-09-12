<script setup lang="ts">
import { RouterView } from "vue-router";
import { NMessageProvider, NLoadingBarProvider } from "naive-ui";
import { onMounted } from "vue";
import { useAuthStore } from "./stores";

document.title = "myHome";
const authStore = useAuthStore();

onMounted(() => {
  setInterval(() => {
    if (authStore.getToken) {
      authStore.REFRESH();
    }
  }, 150000);
});
</script>

<template>
  <n-loading-bar-provider
    :theme-overrides="{ colorLoading: '#00d1b2', height: '5px' }"
  >
    <n-message-provider
      keep-alive-on-hover
      closable
      :theme-overrides="{ fontSize: '19px' }"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
