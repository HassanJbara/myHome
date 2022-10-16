import { defineStore } from "pinia";
import api from "@/api";

export interface User {
  name: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | undefined;
  token: string;
}

export const defaultState = (): AuthState => {
  return {
    user: undefined,
    token: "",
  };
};

export const useAuthStore = defineStore("auth", {
  state: defaultState,
  getters: {
    getUser: (state) => state.user,
    getUsername: (state) => state.user?.name,
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    LOGIN(credentials: AuthCredentials) {
      return api.auth
        .login(credentials.username, credentials.password)
        .then(({ data }) => {
          this.SET_USER({
            name: credentials.username,
          });
          this.SET_TOKEN(data.token);
        });
    },
    LOGOUT() {
      return api.auth.logout().then(() => {
        this.SET_USER(undefined);
        this.SET_TOKEN("");
      });
    },
    // REGISTER(credentials: AuthCredentials) {
    //   return api.auth.register(credentials.username, credentials.password);
    // },
    SET_USER(user: User | undefined) {
      this.user = user;
    },
    SET_TOKEN(token: string) {
      this.token = token;
    },
  },
});
