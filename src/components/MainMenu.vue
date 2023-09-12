<script setup lang="ts">
import { NModal } from "naive-ui";
import InlineSvg from "vue-inline-svg";
import { ref } from "vue";

import { useHomesStore, useAuthStore } from "@/stores";
import { UserLoginSignup } from "@/components";

const showLoginModal = ref(false);
const showSignupModal = ref(false);

const HomesStore = useHomesStore();
const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item font-bold" to="/">myHome</router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'all-homes' }"
          class="navbar-item"
          @click="HomesStore.search()"
        >
          All Homes
        </router-link>
        <a class="navbar-item"> Documentation </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              class="button is-primary font-bold"
              :to="{ name: 'add-property' }"
            >
              <strong>Add Propery</strong>
            </router-link>

            <router-link
              class="button is-info"
              :to="{ name: 'own-account' }"
              v-show="authStore.isAuthenticated"
            >
              <inline-svg
                src="/icons/user-solid.svg"
                width="30"
                height="30"
                fill="white"
              />
            </router-link>

            <a
              class="button is-light"
              @click="showSignupModal = true"
              v-show="!authStore.isAuthenticated"
            >
              <strong>Sign up</strong>
            </a>
            <n-modal
              v-model:show="showSignupModal"
              preset="card"
              title="Account Information"
              class="w-1/4 h-[600px]"
            >
              <UserLoginSignup
                type="signup"
                @exit="() => (showSignupModal = false)"
              />
            </n-modal>

            <a
              class="button is-light"
              @click="showLoginModal = true"
              v-show="!authStore.isAuthenticated"
            >
              Log in
            </a>
            <n-modal
              v-model:show="showLoginModal"
              preset="card"
              title="Account Information"
              class="w-1/4 h-[600px]"
            >
              <UserLoginSignup type="login" @exit="showLoginModal = false" />
            </n-modal>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
