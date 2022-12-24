<script setup lang="ts">
import { Header, Footer, HomeListings, AgentListings } from "@/components";
import { computed } from "vue";

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
</script>

<template>
  <div class="flex flex-col">
    <Header :mobile="isMobile" />
    <HomeListings :mobile="isMobile" />
    <AgentListings :mobile="isMobile" />
    <Footer />
  </div>
</template>
