import api, { axiosRequestWrapper } from "./api";
import { AxiosError } from "axios";

// Fetch Data by Model
export const fetchDataByModel = async (data: Record<string, any>) => {
  return axiosRequestWrapper(api.post, "/syncDB", data);
};
