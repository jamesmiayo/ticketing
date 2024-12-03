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
  newDivision: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/division",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating Division:", error);
      throw error;
    }
  },
  updateDivision: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/division/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteDivision: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/division/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating Division:", error);
      throw error;
    }
  },
};
