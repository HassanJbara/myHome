<script setup lang="ts">
import { RouterView } from "vue-router";
import { NMessageProvider } from "naive-ui";

document.title = "myHome";
</script>

<template>
  <n-message-provider keep-alive-on-hover closable>
    <router-view />
  </n-message-provider>
</template>
