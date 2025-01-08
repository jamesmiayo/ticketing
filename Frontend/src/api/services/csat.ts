import apiClient from "../configs/axiosConfigs";

export const CSAT = {
  getCSAT: async function (params?: any) {
    try {
      const response = await apiClient.request({
        url: "/csat-report",
        method: "GET",
        params: params
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
}