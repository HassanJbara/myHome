import type { AxiosPromise } from "axios";
import { axiosWithAuth } from "@/api/axios";
import type { User, RegisterCredentials, AuthCredentials } from "@/modules";

export interface LoginCallback {
  msg: string;
  user: User;
  refresh: string;
  access: string;
}

export interface RefreshCallback {
  access: string;
}

export interface RegisterCallback {
  msg: string;
  user: {
    username: string;
    email: string;
  };
}

const auth = {
  login: (data: AuthCredentials): AxiosPromise<LoginCallback> => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    return axiosWithAuth.post("login", formData);
  },

  register: (data: RegisterCredentials): AxiosPromise<RegisterCallback> => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);

    return axiosWithAuth.post("register", formData);
  },

  refresh: (refresh_token: string): AxiosPromise<RefreshCallback> => {
    const data = new FormData();
    data.append("refresh", refresh_token);
    return axiosWithAuth.post("token-refresh", data);
  },

  logout: (): AxiosPromise<{ success: boolean }> => {
    return axiosWithAuth.post("logout");
  },
};

export default auth;
