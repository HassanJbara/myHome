import type { AxiosPromise } from "axios";
import axiosAPI from "@/api/axios";
import type { Home, HomesNewProperty, HomesSearch } from "@/modules/homes";

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
  getSearch: (data?: HomesSearch): AxiosPromise<Array<Home>> => {
    return axiosAPI.get("home/search/", { params: data });
  },
};

export default homes;
