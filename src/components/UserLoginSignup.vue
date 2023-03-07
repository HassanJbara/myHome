<script lang="ts" setup>
import { ref } from "vue";
import { NInput, NButton, NCollapseTransition, useMessage } from "naive-ui";
import InlineSvg from "vue-inline-svg";
import { useAuthStore } from "@/stores";

interface Props {
  type: "login" | "signup";
}

const props = withDefaults(defineProps<Props>(), {
  type: "login",
});

const emit = defineEmits<{
  (e: "exit"): void;
}>();

const authStore = useAuthStore();
const message = useMessage();

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfim = ref("");
const type = ref(props.type);

function loginSignUp() {
  if (type.value === "login") {
    authStore
      .LOGIN({
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        if (res.success) {
          message.info(res.msg);
          emit("exit");
        } else {
          message.error(res.msg);
        }
      });
  } else {
    authStore
      .REGISTER({
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirm: passwordConfim.value,
      })
      .then((res) => {
        if (res.success) {
          message.info(res.msg ? res.msg : "User Created");
          type.value = "login";
        } else {
          console.log(res.errors);
          if (res.errors?.username) {
            message.error("Username: " + res.errors.username[0]);
          }
          if (res.errors?.email) {
            message.error("Email: " + res.errors.email[0]);
          }
          if (res.errors?.password) {
            message.error("Password: " + res.errors.password[0]);
          }
          if (res.errors?.password_confirm) {
            message.error(
              "Confirm Password: " + res.errors.password_confirm[0]
            );
          }
        }
      });
  }
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

      <n-collapse-transition :show="type === 'signup'">
        <div class="flex flex-row w-full items-center">
          <span class="w-36 font-bold">Confirm Password:</span>
          <n-input
            v-model:value="passwordConfim"
            class="w-full"
            size="large"
            clearable
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </n-collapse-transition>
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

      <button class="button is-link w-full font-semibold" @click="loginSignUp">
        {{ type === "login" ? "Log In" : "Sign Up" }}
      </button>
    </div>
  </div>
</template>
