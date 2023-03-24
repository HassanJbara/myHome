import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import api from "@/api";
import type {
  User,
  AuthState,
  AuthCredentials,
  RegisterCredentials,
  RegisterError,
  Home,
} from "@/modules";

const defaultState = (): AuthState => {
  return {
    user: useLocalStorage("user", undefined, {
      serializer: {
        read: (us: string) => JSON.parse(us),
        write: (u: User) => JSON.stringify(u),
      },
    }),
    token: useLocalStorage("token", ""),
    refreshToken: useLocalStorage("refreshToken", ""),
  };
};

export const useAuthStore = defineStore("auth", {
  state: defaultState,

  getters: {
    getUser: (state) => state.user,
    getUsername: (state) => state.user?.username,
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refreshToken,
    isAuthenticated: (state) => !!state.user && !!state.token,
  },

  actions: {
    LOGIN(
      credentials: AuthCredentials
    ): Promise<{ success: boolean; msg: string }> {
      return api.auth
        .login(credentials)
        .then(({ data }) => {
          this.SET_USER(data.user);
          this.SET_TOKEN(data.access);
          this.SET_REFRESH(data.refresh);
          return { success: true, msg: data.msg };
        })
        .catch((error) => {
          return { success: false, msg: error.response.data.msg };
        });
    },

    REGISTER(
      credentials: RegisterCredentials
    ): Promise<{ success: boolean; msg?: string; errors?: RegisterError }> {
      return api.auth
        .register(credentials)
        .then(({ data }) => {
          return { success: true, msg: data.msg };
        })
        .catch((error) => {
          console.log(error.response.data);
          return { success: false, errors: error.response.data };
        });
    },

    REFRESH() {
      return api.auth.refresh(this.getRefreshToken).then(({ data }) => {
        this.SET_TOKEN(data.access);
      });
    },

    LOGOUT() {
      return api.auth.logout().then(() => {
        this.SET_USER(undefined);
        this.SET_TOKEN("");
        this.SET_REFRESH("");
      });
    },

    SET_USER(user: User | undefined) {
      this.user = user;
    },

    SET_TOKEN(token: string) {
      this.token = token;
    },

    SET_REFRESH(refreshToken: string) {
      this.refreshToken = refreshToken;
    },

    ADD_TO_WISHLIST() {
      if (this.isAuthenticated) {
        return api.users.wishlisted_list(this.token).then(({ data }) => {
          this.user.wishlisted = data.wishlisted;
        });
      } else {
        console.error("Not logged in, can't wishlist!");
      }
    },
  },
});
