<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import HomeListings from "@/components/HomeListings.vue";
import AgentListings from "@/components/AgentListings.vue";
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <HomeListings />
    <AgentListings />
    <Footer />
  </div>
</template>
