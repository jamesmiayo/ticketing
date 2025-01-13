import apiClient from "../configs/axiosConfigs";

export const REPORT = {
  getReport: async function (params?: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket-reports",
        method: "GET",
        params: params
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
}