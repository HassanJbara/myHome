import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type {
  Home,
  HomesNewProperty,
  HomesSearch,
  HomesWishlistRequest,
} from "@/modules";
import axios from "axios";

const homes = {
  getAll: (): AxiosPromise<Array<Home>> => {
    return axiosAPI.get("home/info/");
  },

  addProperty: (
    data: HomesNewProperty,
    token: string
  ): AxiosPromise<string> => {
    return axiosAPI.post("home/info/add_property/", data, {
      headers: { Authorization: "Bearer " + decodeURI(token) },
    });
  },

  wishlistProperty: (
    data: HomesWishlistRequest,
    token: string
  ): AxiosPromise<string> => {
    return axiosAPI.post("home/info/wishlist/", data, {
      headers: { Authorization: "Bearer " + decodeURI(token) },
    });
  },

  getSearch: (data?: HomesSearch): AxiosPromise<Array<Home>> => {
    return axiosAPI.get("home/search/", { params: data });
  },

  getPlaceID: (location: string, key: string) => {
    return axios.get(
      "https://aiham-cors-proxy.herokuapp.com/" +
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: location,
          key: key,
          libraries: "places",
        },
      }
    );
  },
};

export default homes;
