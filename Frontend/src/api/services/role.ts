import apiClient from "../configs/axiosConfigs";

export const Role = {
  getRole: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/role",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newRole: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/role",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating Role:", error);
      throw error;
    }
  },
  updateRole: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/role/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteRole: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/role/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating Role:", error);
      throw error;
    }
  },
};
