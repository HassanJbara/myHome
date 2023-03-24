import type { Home } from "@/modules";
import type { RemovableRef } from "@vueuse/core";

export interface User {
  id: number;
  username: string;
  email: string;
  wishlisted: Home[];
  created: Home[];
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface RegisterError {
  username?: string[];
  email?: string[];
  password?: string[];
  password_confirm?: string[];
}

export interface AuthState {
  user: RemovableRef<User | undefined>;
  token: RemovableRef<string>;
  refreshToken: RemovableRef<string>;
}

export interface WishlistListCallback {
  msg: string;
  wishlisted: Home[];
}
