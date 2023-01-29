<script setup lang="ts">
import { SiteHeader, SiteFooter } from "@/components";

import { NResult } from "naive-ui";
</script>

<template>
  <main>
    <SiteHeader :with-search="false" />
    <n-result
      status="error"
      title="404 Not Found"
      description="The page or home you are looking for couldn't be found"
      class="h-[60vh] p-10 flex flex-col items-center justify-center"
    />
    <SiteFooter />
  </main>
</template>
