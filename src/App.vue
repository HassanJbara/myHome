<script setup lang="ts">
import { RouterView } from "vue-router";
import { NMessageProvider } from "naive-ui";
</script>

<template>
  <n-message-provider keep-alive-on-hover closable>
    <router-view />
  </n-message-provider>
</template>
