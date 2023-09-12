import type { AxiosPromise } from "axios";
import { axiosAPI } from "@/api/axios";
import type { Agent } from "@/modules";

const agents = {
  getAll: (): AxiosPromise<Array<Agent>> => {
    return axiosAPI.get("agent/info/");
  },
};

export default agents;
