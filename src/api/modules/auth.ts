import type { AxiosPromise } from "axios";
import axiosWithAuth from "@/api/axios";

export interface LoginCallback {
  token: string;
}

// export interface RegisterCallback {
//   username: string | string[];
// }

const auth = {
  login: (username: string, password: string): AxiosPromise<LoginCallback> => {
    return axiosWithAuth.post("login/", { username, password });
  },
  logout: (): AxiosPromise<{ success: boolean }> => {
    return axiosWithAuth.post("logout/");
  },
  //   register: (
  //     username: string,
  //     password: string
  //   ): AxiosPromise<RegisterCallback> => {
  //     return axiosWithAuth.post("register/", { username, password });
  //   },
};

export default auth;
