import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type { WishlistListCallback } from "@/modules";

const users = {
  wishlisted_list: (token: string): AxiosPromise<WishlistListCallback> => {
    return axiosAPI.get("users/wishlisted", {
      headers: { Authorization: "Bearer " + decodeURI(token) },
    });
  },
};

export default users;
