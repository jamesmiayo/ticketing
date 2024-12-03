import apiClient from "../configs/axiosConfigs";

export const Division = {
  getDivision: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/division",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
}