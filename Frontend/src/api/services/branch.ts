import apiClient from "../configs/axiosConfigs";

export const Branch = {
  getBranch: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/branch",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newBranch: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/branch",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating Branch:", error);
      throw error;
    }
  },
  updateBranch: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/branch/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteBranch: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/branch/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating Branch:", error);
      throw error;
    }
  },
};
