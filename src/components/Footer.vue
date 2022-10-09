<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
</script>

<template>
  <footer class="footer mt-12">
    <div class="content has-text-centered columns">
      <div class="column">
        <div class="buttons">
          <router-link
            class="button is-primary font-bold w-full"
            :to="{ name: 'add-property' }"
          >
            <strong>Add Propery</strong>
          </router-link>
        </div>
      </div>
      <div class="column">
        <h4 class="mx-3">First column</h4>
      </div>
      <div class="column">
        <h4 class="mx-3">First column</h4>
      </div>
      <div class="column">
        <h4 class="mx-3">Social Media</h4>
        <div class="flex flex-row gap-2">
          <inline-svg src="./icons/facebook.svg" width="25" height="25" />
          <inline-svg src="./icons/twitter.svg" width="25" height="25" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style></style>
