import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${process.env.BACKEND_BASE_URL}/api`,
});
