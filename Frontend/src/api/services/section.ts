import apiClient from "../configs/axiosConfigs";

export const Section = {
  getSection: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/section",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getSectionList: async function () {
    try {
      const response = await apiClient.request({
        url: "/list/maintenance/section",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newSection: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/section",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating Section:", error);
      throw error;
    }
  },
  updateSection: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/section/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteSection: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/section/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating Section:", error);
      throw error;
    }
  },
};
