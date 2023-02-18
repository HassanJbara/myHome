<script lang="ts" setup>
import type { User } from "@/modules";

import {
  NDivider,
  NButton,
  NCollapseTransition,
  NInput,
  NScrollbar,
} from "naive-ui";
import { ref } from "vue";
import InlineSvg from "vue-inline-svg";

interface Props {
  user: User;
}

const props = defineProps<Props>();

const userRef = ref<User>(props.user);
const editing = ref<boolean>(false);
const passwordEdit = ref<boolean>(false);
const passwordInfo = ref({
  old: "",
  new: "",
  newRepeat: "",
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-row m-6 items-center self-center">
      <div class="flex flex-row self-center gap-4">
        <InlineSvg
          src="/icons/user-solid.svg"
          width="30"
          height="30"
          fill="black"
        />
        <header class="font-bold text-2xl">My Account</header>
      </div>

      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <n-button
          v-if="!editing"
          class="absolute right-32"
          text
          style="font-size: 24px"
          @click="editing = true"
        >
          <InlineSvg
            src="/icons/pen-to-square-regular.svg"
            width="30"
            height="30"
            fill="black"
          />
        </n-button>
      </Transition>
    </div>

    <n-scrollbar style="max-height: 60vh">
      <div class="flex flex-row overflow-auto h-full w-full">
        <div class="mx-6 my-3 flex flex-col gap-8">
          <span class="text-lg font-semibold">Username: </span>

          <n-divider />

          <span class="text-lg font-semibold">E-Mail:</span>

          <n-divider />

          <button
            class="button is-primary font-semibold self-center"
            :disabled="editing"
            @click="passwordEdit = true"
          >
            Set a New Password?
          </button>

          <n-collapse-transition
            :show="passwordEdit && !editing"
            class="gap-4 flex flex-col"
          >
            <span class="text-lg font-semibold">Old Password:</span>
            <span class="text-lg font-semibold">New Password:</span>
            <span class="text-lg font-semibold">Repeat Password:</span>
            <button
              class="button is-link w-full font-semibold"
              @click="passwordEdit = false"
            >
              Submit
            </button>
          </n-collapse-transition>
        </div>

        <div class="mx-6 my-3 flex flex-col gap-8">
          <span v-if="!editing" class="text-lg">{{ user.username }}</span>
          <n-input
            v-else
            type="text"
            :placeholder="user.username"
            v-model:value="userRef.username"
          />

          <n-divider />

          <span v-if="!editing" class="text-lg">{{ user.email }}</span>
          <n-input
            v-else
            type="text"
            :placeholder="user.email"
            v-model:value="userRef.email"
          />

          <n-divider />

          <button
            class="button is-primary font-semibold self-center invisible"
            :disabled="editing"
            @click="passwordEdit = true"
          >
            Set a New Password?
          </button>

          <n-collapse-transition
            :show="passwordEdit && !editing"
            class="gap-4 flex flex-col"
          >
            <n-input
              type="password"
              placeholder="old password"
              v-model:value="passwordInfo.old"
            />
            <n-input
              type="password"
              placeholder="new password"
              v-model:value="passwordInfo.new"
            />
            <n-input
              type="password"
              placeholder="new password again"
              v-model:value="passwordInfo.newRepeat"
            />
          </n-collapse-transition>
        </div>
        <!-- <div class="mx-6 my-3 flex flex-row gap-2">
        <span class="text-lg font-semibold">E-Mail:</span>
        <span class="text-lg">{{ user.email }}</span>
      </div>
      <div class="mx-6 my-3 flex flex-row gap-2">
        <span class="text-lg font-semibold">E-Mail:</span>
        <span class="text-lg">{{ user.email }}</span>
      </div> -->
      </div>
    </n-scrollbar>

    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <button
        v-if="editing"
        class="button is-link w-1/2 font-semibold self-center mb-6"
        @click="editing = false"
      >
        Save
      </button>
    </Transition>
  </div>
</template>
