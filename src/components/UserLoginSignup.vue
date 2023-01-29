<script lang="ts" setup>
import { ref } from "vue";
import { NInput, NButton, NCollapseTransition } from "naive-ui";
import InlineSvg from "vue-inline-svg";

interface Props {
  type: "login" | "signup";
}

const props = withDefaults(defineProps<Props>(), {
  type: "login",
});

const username = ref(null);
const email = ref(null);
const password = ref(null);
const type = ref(props.type);

function login() {
  console.log([username.value, password.value]);
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-evenly">
    <inline-svg src="/icons/user.svg" width="200" height="200" />

    <div class="w-full h-full flex flex-col justify-center items-center gap-4">
      <div class="flex flex-row w-full items-center">
        <span class="w-36 font-bold">Username:</span>
        <n-input
          v-model:value="username"
          class="w-full"
          size="large"
          clearable
          type="text"
          placeholder="Username"
        />
      </div>

      <n-collapse-transition :show="type === 'signup'">
        <div class="flex flex-row w-full items-center">
          <span class="w-36 font-bold">E-Mail:</span>
          <n-input
            v-model:value="email"
            class="w-full"
            size="large"
            clearable
            type="text"
            placeholder="E-Mail"
          />
        </div>
      </n-collapse-transition>

      <div class="flex flex-row w-full items-center">
        <span class="w-36 font-bold">Password:</span>
        <n-input
          v-model:value="password"
          class="w-full"
          size="large"
          clearable
          type="password"
          placeholder="Password"
        />
      </div>
    </div>

    <div class="control w-[80%] self-center flex flex-col gap-2">
      <n-button
        quaternary
        type="primary"
        class="self-center"
        @click="type === 'login' ? (type = 'signup') : (type = 'login')"
      >
        {{
          type === "login"
            ? "No account? Signup instead"
            : "Already has an account? Login instead"
        }}
      </n-button>

      <button class="button is-link w-full font-semibold" @click="login">
        Log In
      </button>
    </div>
  </div>
</template>
