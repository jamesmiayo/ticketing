import apiClient from "../configs/axiosConfigs";

export const AHT = {
  getAHT: async function (params?: any) {
    try {
      const response = await apiClient.request({
        url: "/average-handle-time",
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